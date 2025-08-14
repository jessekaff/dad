---
description: Rules to execute subtasks for a parent task using Development Accelerator Documentation (DAD)
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Subtask Execution Rules

## Overview

Execute subtasks for a specific parent task systematically following a TDD development workflow.

<pre_flight_check>
EXECUTE: @.dad/instructions/meta/pre-flight.md
</pre_flight_check>

<process_flow>

<step number="1" name="task_understanding">

### Step 1: Parent Task Understanding

Read and analyze the given parent task and all its subtasks from subtasks.md to gain complete understanding of what needs to be built.

<task_analysis>
<read_from_tasks_md> - Parent task description - All subtask descriptions - Task dependencies - Expected outcomes
</read_from_tasks_md>
</task_analysis>

<instructions>
  ACTION: Read the specific parent task and all its subtasks
  ANALYZE: Full scope of implementation required
  UNDERSTAND: Dependencies and expected deliverables
  NOTE: Test requirements for each subtask
</instructions>

</step>

<step number="2" name="technical_spec_review">

### Step 2: Technical Specification Review

Search and extract relevant sections from specs/technical-spec.md to understand the technical implementation approach for this task.

<selective_reading>
<search_technical_spec>
FIND sections in specs/technical-spec.md related to: - Current task functionality - Implementation approach for this feature - Integration requirements - Performance criteria
</search_technical_spec>
</selective_reading>

<instructions>
  ACTION: Search specs/technical-spec.md for task-relevant sections
  EXTRACT: Only implementation details for current task
  SKIP: Unrelated technical specifications
  FOCUS: Technical approach for this specific feature
</instructions>

</step>

<step number="3" subagent="context-fetcher" name="best_practices_review">

### Step 3: Best Practices Review

Use the context-fetcher subagent to retrieve relevant sections from @.dad/standards/best-practices.md that apply to the current task's technology stack and feature type.

<selective_reading>
<search_best_practices>
FIND sections relevant to: - Task's technology stack - Feature type being implemented - Testing approaches needed - Code organization patterns
</search_best_practices>
</selective_reading>

<instructions>
  ACTION: Use context-fetcher subagent
  REQUEST: "Find best practices sections relevant to:
            - Task's technology stack: [CURRENT_TECH]
            - Feature type: [CURRENT_FEATURE_TYPE]
            - Testing approaches needed
            - Code organization patterns"
  PROCESS: Returned best practices
  APPLY: Relevant patterns to implementation
</instructions>

</step>

<step number="4" subagent="context-fetcher" name="code_style_review">

### Step 4: Standards Review

Use the context-fetcher subagent to retrieve relevant development standards from @.dad/standards/ for the technologies and patterns being used in this task.

<selective_reading>
<search_standards>
FIND relevant guidelines from: - @.dad/standards/best-practices.md - @.dad/standards/tech-stack.md - @.dad/standards/testing-guidelines.md - Any framework-specific standards
</search_standards>
</selective_reading>

<instructions>
  ACTION: Use context-fetcher subagent
  REQUEST: "Find code style rules for:
            - Languages: [LANGUAGES_IN_TASK]
            - File types: [FILE_TYPES_BEING_MODIFIED]
            - Component patterns: [PATTERNS_BEING_IMPLEMENTED]
            - Testing style guidelines"
  PROCESS: Returned style rules
  APPLY: Relevant formatting and patterns
</instructions>

</step>

<step number="5" name="task_execution">

### Step 5: Subtask Execution

Execute all subtasks for the parent task in order using test-driven development (TDD) approach.

<typical_task_structure>
<first_subtask>Write tests for [feature]</first_subtask>
<middle_subtasks>Implementation steps</middle_subtasks>
<final_subtask>Verify all tests pass</final_subtask>
</typical_task_structure>

<execution_order>
<subtask_1_tests>
IF subtask 1 is "Write tests for [feature]": - Write all tests for the parent feature - Include unit tests, integration tests, edge cases - Run tests to ensure they fail appropriately - Mark subtask 1 complete
</subtask_1_tests>

<middle_subtasks_implementation>
FOR each implementation subtask (2 through n-1): - Implement the specific functionality - Make relevant tests pass - Update any adjacent/related tests if needed - Refactor while keeping tests green - Mark subtask complete
</middle_subtasks_implementation>

<final_subtask_verification>
IF final subtask is "Verify all tests pass": - Run entire test suite - Fix any remaining failures - Ensure no regressions - Mark final subtask complete
</final_subtask_verification>
</execution_order>

<test_management>
<new_tests> - Written in first subtask - Cover all aspects of parent feature - Include edge cases and error handling
</new_tests>
<test_updates> - Made during implementation subtasks - Update expectations for changed behavior - Maintain backward compatibility
</test_updates>
</test_management>

<instructions>
  ACTION: Execute subtasks in their defined order
  RECOGNIZE: First subtask typically writes all tests
  IMPLEMENT: Middle subtasks build functionality
  VERIFY: Final subtask ensures all tests pass
  UPDATE: Mark each subtask complete as finished
</instructions>

</step>

<step number="6" subagent="test-runner" name="task_test_verification">

### Step 6: Task-Specific Test Verification

Use the test-runner subagent to run and verify only the tests specific to this parent task (not the full test suite) to ensure the feature is working correctly.

<focused_test_execution>
<run_only> - All new tests written for this parent task - All tests updated during this task - Tests directly related to this feature
</run_only>
<skip> - Full test suite (done later in execute-task.md) - Unrelated test files
</skip>
</focused_test_execution>

<final_verification>
IF any test failures: - Debug and fix the specific issue - Re-run only the failed tests
ELSE: - Confirm all task tests passing - Ready to proceed
</final_verification>

<instructions>
  ACTION: Use test-runner subagent
  REQUEST: "Run tests for [this parent task's test files]"
  WAIT: For test-runner analysis
  PROCESS: Returned failure information
  VERIFY: 100% pass rate for task-specific tests
  CONFIRM: This feature's tests are complete
</instructions>

</step>

<step number="7" name="mandatory_code_quality_verification">

### Step 7: Mandatory Code Quality Verification

**CRITICAL - This step is mandatory and blocking. Task cannot be completed if any of these fail.**

For any code changes, you MUST run and pass all of the following verification checks:

<verification_requirements>
<type_check>
COMMAND: yarn workspace [workspace-name] type-check
REQUIREMENT: MUST fix all TypeScript errors before proceeding
PROHIBITION: No `any` types without explicit justification
VALIDATION: All imports and exports must be properly typed
</type_check>

<lint_check>
COMMAND: yarn workspace [workspace-name] lint
REQUIREMENT: MUST fix all linting errors before proceeding  
AUTO_FIX: Use `yarn workspace [workspace-name] lint:fix` when available
PROHIBITION: No warnings that can be auto-fixed should remain
</lint_check>

<build_verification>
COMMAND: yarn workspace [workspace-name] build (if applicable)
REQUIREMENT: MUST ensure the build succeeds without errors
VALIDATION: No compilation or bundling failures
</build_verification>
</verification_requirements>

<failure_handling>
IF any verification check fails:

- Fix the errors immediately
- Re-run the specific failing check
- Do not proceed to next step until ALL checks pass
- Do not mark the task as complete
  </failure_handling>

<detailed_procedures>
REFERENCE: Follow testing guidelines in `.dad/standards/testing-guidelines.md` for verification procedures.
</detailed_procedures>

<instructions>
  ACTION: Run type-check, lint, and build verification
  ENFORCE: All checks must pass before proceeding
  FIX: Any errors immediately upon detection
  VERIFY: Re-run failed checks after fixing
  BLOCK: Task completion until 100% verification success
</instructions>

</step>

<step number="8" name="task_status_updates">

### Step 8: Task Status Updates

Update the subtasks.md file immediately after completing each task to track progress.

<update_format>
<completed>- [x] Task description</completed>
<incomplete>- [ ] Task description</incomplete>
<blocked> - [ ] Task description
⚠️ Blocking issue: [DESCRIPTION]
</blocked>
</update_format>

<blocking_criteria>
<attempts>maximum 3 different approaches</attempts>
<action>document blocking issue</action>
<emoji>⚠️</emoji>
</blocking_criteria>

<instructions>
  ACTION: Update subtasks.md after each task completion
  MARK: [x] for completed items immediately
  DOCUMENT: Blocking issues with ⚠️ emoji
  LIMIT: 3 attempts before marking as blocked
</instructions>

</step>

<step number="9" name="dad_improvement_analysis">

### Step 9: DAD Improvement Analysis (Post-Completion)

After task completion, analyze for potential DAD system improvements using selective criteria.

<improvement_analysis>
ANALYZE: Was any critical information missing from DAD that was needed?
IDENTIFY: Could this task be templated for future efficiency?
DOCUMENT: Were new patterns established that should be captured?
CAPTURE: What troubleshooting knowledge was gained?
</improvement_analysis>

<strict_criteria>
ONLY suggest improvements when they meet high-value criteria:

- Information gap caused significant delay or confusion
- Repeatable pattern emerged that would benefit other tasks
- New best practice was established through task completion
- Significant troubleshooting knowledge was discovered
  </strict_criteria>

<reference>
METHODOLOGY: See `.dad/instructions/meta/dad-improvement-methodology.md` for complete improvement process
PERMISSION: Always ask before making DAD updates
SELECTIVITY: Most tasks should have no improvement suggestions
</reference>

<instructions>
  ACTION: Analyze task completion for DAD improvement opportunities
  APPLY: Strict criteria for improvement suggestions
  REFERENCE: DAD improvement methodology for process details
  REQUEST: Permission before making any DAD updates
</instructions>

</step>

</process_flow>
