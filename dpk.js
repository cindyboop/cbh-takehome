const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  function normalizeInput(data, force) {
    if (force || typeof data !== "string") {
      return JSON.stringify(data);
    }
    return data;
  }

  function createCandidate(data) {
    const normalize = normalizeInput(data, true);
    return crypto.createHash("sha3-512").update(normalize).digest("hex");
  }

  function checkCandidateLength(candidate) {
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      return createCandidate(candidate);
    }
    return candidate;
  }

  let candidate;
  if (event) {
    if (event.partitionKey) {
      const normalize = normalizeInput(event.partitionKey);
      return checkCandidateLength(normalize);
    }
    candidate = createCandidate(event);
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return checkCandidateLength(candidate);
};

// const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };
