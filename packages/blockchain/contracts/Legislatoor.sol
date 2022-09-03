// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./IERC20.sol";
import "./JurisdictionFund.sol";
import "./TokenTransferProxy.sol";

contract Legislatoor is TokenTransferProxy {
    IERC20 public token;
    uint public jurisdictionCount = 178;

    constructor(IERC20 _token) {
        token = _token;
    }

    mapping(uint => JurisdictionFund) public jurisdictions;

    // Using same ids as EthMap
    modifier onlyValidJurisdiction(uint jurisdictionId)
    {
       // Throws if jurisdiction id is not valid
        require(jurisdictionId >= 1 && jurisdictionId <= jurisdictionCount);
        _;
    }

    function details(uint jurisdictionId) public view onlyValidJurisdiction(jurisdictionId) returns(address jurisdictionFund, uint totalContributions, uint totalContributionsPicked, uint submissionCount, uint mostVotedSubmission) {
        address addr = address(jurisdictions[jurisdictionId]);

        if (addr == address(0)) {
            return (address(0), 0, 0, 0, 0);
        }
        
        return (
            addr,
            jurisdictions[jurisdictionId].totalContributions(),
            jurisdictions[jurisdictionId].totalContributionsPicked(),
            jurisdictions[jurisdictionId].submissionCount(),
            jurisdictions[jurisdictionId].mostVotedSubmission()
        );
    }

    function contribute(uint jurisdictionId, uint amount) public onlyValidJurisdiction(jurisdictionId) {
        ensureJurisdictionCreated(jurisdictionId);

        jurisdictions[jurisdictionId].contribute(msg.sender, amount);
    }

    function submitDocument(uint jurisdictionId, string memory ipfsReference) public onlyValidJurisdiction(jurisdictionId) {
        ensureJurisdictionCreated(jurisdictionId);

        jurisdictions[jurisdictionId].submitDocument(msg.sender, ipfsReference);
    }

    function pickWinner(uint jurisdictionId, uint submissionId) public onlyValidJurisdiction(jurisdictionId) {
        ensureJurisdictionCreated(jurisdictionId);

        jurisdictions[jurisdictionId].pickWinner(msg.sender, submissionId);
    }

    function withdrawReward(uint jurisdictionId) public onlyValidJurisdiction(jurisdictionId) {
        ensureJurisdictionCreated(jurisdictionId);

        jurisdictions[jurisdictionId].withdrawReward(msg.sender);
    }

    function ensureJurisdictionCreated(uint jurisdictionId) private onlyValidJurisdiction(jurisdictionId) {
        if (address(jurisdictions[jurisdictionId]) == address(0)) {
            // Instatiate contract to manage contributions for this jurisdiction if not created yet.
            jurisdictions[jurisdictionId] = new JurisdictionFund(this);
        }
    }
}
