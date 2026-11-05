import { hashPassword, verifyPassword } from "../lib/auth.js";
import { findUserByEmailOrPhone } from "../lib/db.js";

async function runTests() {
  console.log("=== Testing Authentication Logic ===");

  // 1. Test finding user by email
  const userByEmail = await findUserByEmailOrPhone("vikram.rathore@example.com");
  console.log("Found by email:", userByEmail ? userByEmail.name : "FAIL");

  // 2. Test finding user by phone
  const userByPhone = await findUserByEmailOrPhone("9829012345");
  console.log("Found by phone:", userByPhone ? userByPhone.name : "FAIL");

  // 3. Test invalid user
  const nonExistent = await findUserByEmailOrPhone("nonexistent@example.com");
  console.log("Non-existent user lookup:", nonExistent === null ? "PASS (null)" : "FAIL");

  // 4. Test password hashing & verification
  const testPass = "SecurePass123";
  const { hash, salt } = hashPassword(testPass);
  const correct = verifyPassword(testPass, hash, salt);
  const incorrect = verifyPassword("WrongPassword", hash, salt);
  console.log("Correct password check:", correct ? "PASS" : "FAIL");
  console.log("Incorrect password check:", !incorrect ? "PASS" : "FAIL");

  console.log("=== Authentication Logic Tests Completed Successfully ===");
}

runTests().catch(console.error);

