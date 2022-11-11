const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns an encrypted string when given a string", () => {
    const trivialKey = deterministicPartitionKey("hello");
    expect(trivialKey).toBe(
      "ea80224d30664a6d5d6ed2460016177b429fdce58b820ecf490d470718e28886291085ef696f338781821c81cdeff08577a0acec0ff1906e05505d17a1d129a0"
    );
  });

  it("Returns an encrypted string when given a number", () => {
    const trivialKey = deterministicPartitionKey(123);
    expect(trivialKey).toBe(
      "48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc"
    );
  });

  it("Returns an encrypted string when given a list with numbers", () => {
    const trivialKey = deterministicPartitionKey([1, 2, 3]);
    expect(trivialKey).toBe(
      "90b44b7c9dc7d60ce7d3c815adf697f7408c955b7e4ab0d0e4a15314e5b5ac50da76a2c863fa9ba6aef2ee16bcf929351e06044e250cb2c6331c64d053cf6e79"
    );
  });

  it("Returns an encrypted string when given a list with strings", () => {
    const trivialKey = deterministicPartitionKey(["a", "b", "c"]);
    expect(trivialKey).toBe(
      "903d643f1a302ef54000c7c6e40d37404e0c1a483fe2ea2abcf425d20f11c971f1e5b50f8ed43c54dac088acf8e2b88c2d1dce2ee36469aa032691aa92153b58"
    );
  });

  it("Returns an encrypted string when given an object with partitionKey of a string", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: "123",
      b: "456",
    });
    expect(trivialKey).toBe("123");
  });

  it("Returns an encrypted string when given an object with partitionKey of a number", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: 123,
    });
    expect(trivialKey).toBe("123");
  });
});
