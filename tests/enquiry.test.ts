import test from "node:test";import assert from "node:assert/strict";import { validateEnquiry } from "../src/lib/enquiry";
const valid={name:"Musa Mahlangu",email:"musa@example.com",phone:"+27 63 141 3009",service:"cv-writing",budget:"Please advise",description:"I need help positioning my experience for a specific role.",deadline:"2026-10-01",consent:true,startedAt:Date.now()-5000};
test("accepts a complete enquiry",()=>assert.deepEqual(validateEnquiry(valid),[]));
test("rejects invalid and too-short fields",()=>assert.ok(validateEnquiry({...valid,email:"bad",description:"short"}).length>=2));
test("rejects bot trap submissions",()=>assert.ok(validateEnquiry({...valid,website:"spam"}).includes("Invalid request")));
