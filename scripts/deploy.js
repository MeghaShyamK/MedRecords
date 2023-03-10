const hre = require("hardhat");

async function main() {
  const MedRecords = await hre.ethers.getContractFactory("MedRecords");
  const upload = await MedRecords.deploy();

  await upload.deployed();

  console.log("Library deployed to:", upload.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});