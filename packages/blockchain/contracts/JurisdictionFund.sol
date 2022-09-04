// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./IERC20.sol";
import "./Legislatoor.sol";

contract JurisdictionFund {
    Legislatoor private origin;

    event Contribute(address contributor, uint amount, uint contributorTotal, uint when);
    event PickWinner(address contributor, uint pickedSubmission, uint when);
    event RewardPaid(address winner, uint pickedSubmission, uint when);

    constructor(Legislatoor _origin) {
        origin = _origin;
    }

    modifier onlyFromOrigin()
    {
        require(msg.sender == address(origin));
        _;
    }

    uint public totalContributions = 0;
    mapping(address => uint) public contributions;

    function contribute(address contributor, uint amount) public onlyFromOrigin {
        require(!rewardPaid);
        require(amount > 0);
        
        origin.execute(address(origin.token()), contributor, address(this), amount);
        contributions[contributor] += amount;
        totalContributions += amount;
        emit Contribute(contributor, amount, contributions[contributor], block.timestamp);

        if (picks[contributor] > 0) {
            // Contributor already picked a winner. Allocate new votes from this new contribution to that same winner.
            totalContributionsPicked += amount;
            submissions[picks[contributor]].votes += amount;

            // Update currently elected winner
            if (mostVotedSubmission == 0 || submissions[mostVotedSubmission].votes < submissions[picks[contributor]].votes) {
                mostVotedSubmission = picks[contributor];
            }
        }
    }

    struct Submission {
        string ipfsReference;
        address submitter;
        uint votes;
    }

    uint public submissionCount = 0;
    mapping(uint => Submission) public submissions;

    function submitDocument(address submitter, string memory ipfsReference) public onlyFromOrigin {
        require(!rewardPaid);

        submissionCount += 1; // submission id of 0 is invalid to allow default values in mappings
        submissions[submissionCount] = Submission(ipfsReference, submitter, 0);
    }

    uint public totalContributionsPicked = 0;
    mapping(address => uint) public picks; // maps address of contributor to submission-id
    uint public mostVotedSubmission = 0;

    function pickWinner(address contributor, uint submissionId) public onlyFromOrigin {
        require(!rewardPaid);
        require(submissionId > 0);
        require(submissionId <= submissionCount);
        require(contributions[contributor] > 0);

        if (picks[contributor] == 0) {
            // first pick from this contributor
            totalContributionsPicked += contributions[contributor];
        } else {
            // overwrites existing pick from this contributor
            submissions[picks[contributor]].votes -= contributions[contributor];
        }

        picks[contributor] = submissionId;
        submissions[submissionId].votes += contributions[contributor];
        emit PickWinner(contributor, submissionId, block.timestamp);

        // Update currently elected winner
        if (mostVotedSubmission == 0 || submissions[mostVotedSubmission].votes < submissions[submissionId].votes) {
            mostVotedSubmission = submissionId;
        }
    }

    function voteCompletionThreshold() public view returns (uint) {
        // Todo: Determine a minimum threshold that decreases with time to account for dead wallets
        return totalContributions;
    }

    bool rewardPaid = false;

    function withdrawReward(address sender) public onlyFromOrigin {
        require(!rewardPaid);
        require(totalContributionsPicked >= voteCompletionThreshold());

        Submission memory winner = submissions[mostVotedSubmission];

        require(winner.submitter == sender);
        
        origin.execute(address(origin.token()), address(this), sender, totalContributions);
        rewardPaid = true;
        emit RewardPaid(sender, mostVotedSubmission, block.timestamp);
    }
}
