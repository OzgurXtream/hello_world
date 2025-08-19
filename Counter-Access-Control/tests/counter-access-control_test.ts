import { assertEquals, describe, it } from "std/testing/asserts";
import { Clarinet, Tx, Chain, Account } from "clarinet";
import { assert } from "chai";

describe("Counter Access Control Tests", () => {
  let admin: Account;
  let user: Account;

  beforeEach(async () => {
    admin = await Clarinet.deploy("counter-access-control.clar");
    user = await Clarinet.deploy("counter-access-control.clar");
  });

  it("should initialize counter to 0", async () => {
    const result = await Chain.callReadOnlyFn(admin.address, "get-count", []);
    assertEquals(result, 0);
  });

  it("should allow admin to increment the counter", async () => {
    await Chain.callContractFn(admin.address, "increment", []);
    const result = await Chain.callReadOnlyFn(admin.address, "get-count", []);
    assertEquals(result, 1);
  });

  it("should allow admin to decrement the counter", async () => {
    await Chain.callContractFn(admin.address, "increment", []);
    await Chain.callContractFn(admin.address, "decrement", []);
    const result = await Chain.callReadOnlyFn(admin.address, "get-count", []);
    assertEquals(result, 0);
  });

  it("should not allow non-admin to increment the counter", async () => {
    const result = await Chain.callContractFn(user.address, "increment", []);
    assert.isTrue(result.error);
  });

  it("should not allow non-admin to decrement the counter", async () => {
    const result = await Chain.callContractFn(user.address, "decrement", []);
    assert.isTrue(result.error);
  });

  it("should allow admin to transfer admin rights", async () => {
    await Chain.callContractFn(admin.address, "transfer-admin", [user.address]);
    const result = await Chain.callReadOnlyFn(user.address, "is-admin", []);
    assert.isTrue(result);
  });

  it("should not allow previous admin to increment after transfer", async () => {
    await Chain.callContractFn(admin.address, "transfer-admin", [user.address]);
    const result = await Chain.callContractFn(admin.address, "increment", []);
    assert.isTrue(result.error);
  });

  it("should allow new admin to increment after transfer", async () => {
    await Chain.callContractFn(admin.address, "transfer-admin", [user.address]);
    await Chain.callContractFn(user.address, "increment", []);
    const result = await Chain.callReadOnlyFn(user.address, "get-count", []);
    assertEquals(result, 1);
  });
});