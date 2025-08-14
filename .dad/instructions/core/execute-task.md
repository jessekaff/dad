---
description: Rules to initiate execution of a set of tasks using Development Accelerator Documentation (DAD)
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Task Execution Rules

## Overview

Initiate execution of one or more subtasks for a given task.

<pre_flight_check>
EXECUTE: @.dad/instructions/meta/pre-flight.md
</pre_flight_check>

<process_flow>

<step number="1" name="task_assignment">

### Step 1: Task Assignment

Present task execution options to allow the user to choose between executing existing task tasks or following the product roadmap.

<task_execution_options>

**Task Execution Options:**

1. **Execute Existing Task Tasks**
   - Show available tasks with uncompleted tasks
   - Allow selection of specific task and tasks
   - Execute selected task tasks

2. **Execute Next Roadmap Item**
   - Follow the product roadmap sequence
   - Work on next planned roadmap feature
   - Systematic product development

**Prompt**: "Choose execution method:

- List available tasks to show options, or
- Type 'roadmap' to continue with next roadmap item"

</task_execution_options>

<task_selection_logic>
<task_tasks>
IF user selects existing task:
CONTINUE: With Step 2 using selected task
LOAD: Specified task subtasks.md
</task_tasks>

<roadmap_tasks>  
IF user chooses 'roadmap':
CONTINUE: With Step 2 using roadmap
FIND: Next uncompleted roadmap item
</roadmap_tasks>
</task_selection_logic>

<instructions>
  ACTION: Present execution options to user
  SEARCH: Available tasks with uncompleted tasks
  DISPLAY: Task options with task summaries
  WAIT: For user selection
  CONFIRM: Selected approach before proceeding
</instructions>

</step>

<step number="2" subagent="context-fetcher" name="context_analysis">

### Step 2: Context Analysis

Use the context-fetcher subagent to gather minimal context for task understanding by always loading task subtasks.md, and conditionally loading @.dad/product/mission-lite.md, task-lite.md, and specs/technical-spec.md if not already in context.

<instructions>
  ACTION: Use context-fetcher subagent to:
    - REQUEST: "Get product pitch from mission-lite.md"
    - REQUEST: "Get task summary from task-lite.md"
    - REQUEST: "Get technical approach from specs/technical-spec.md"
  PROCESS: Returned information
</instructions>

<context_gathering>
<essential_docs> - subtasks.md for task breakdown
</essential_docs>
<conditional_docs> - mission-lite.md for product alignment - task-lite.md for feature summary - specs/technical-spec.md for implementation details
</conditional_docs>
</context_gathering>

</step>

<step number="3" name="development_server_check">

### Step 3: Check for Development Server

Check for any running development server and ask user permission to shut it down if found to prevent port conflicts.

<server_check_flow>
<if_running>
ASK user to shut down
WAIT for response
</if_running>
<if_not_running>
PROCEED immediately
</if_not_running>
</server_check_flow>

<user_prompt>
A development server is currently running.
Should I shut it down before proceeding? (yes/no)
</user_prompt>

<instructions>
  ACTION: Check for running local development server
  CONDITIONAL: Ask permission only if server is running
  PROCEED: Immediately if no server detected
</instructions>

</step>

<step number="4" subagent="git-workflow" name="git_branch_management">

### Step 4: Git Branch Management (Conditional)

Check current git branch and only create a new branch if currently on main/master.

<branch_logic>
CHECK current branch name
IF on main OR master:
ACTION: Use git-workflow subagent
REQUEST: "Create and switch to new branch: [TASK_NAME] - Branch name from task folder (exclude date prefix) - Handle any uncommitted changes"
WAIT: For branch creation
ELSE:
SKIP: Branch creation
NOTE: "Continuing on current branch: [CURRENT_BRANCH]"
PROCEED: To next step
</branch_logic>

<instructions>
  ACTION: Check current git branch first
  CONDITIONAL: Only create branch if on main/master
  PRESERVE: Existing feature branches
  HANDLE: Uncommitted changes if switching
</instructions>

<branch_naming>

  <source>task folder name</source>
  <format>exclude date prefix</format>
  <example>
    - folder: 2025-03-15-password-reset
    - branch: password-reset
  </example>
</branch_naming>

</step>

<step number="5" name="task_execution_loop">

### Step 5: Task Execution Loop

Execute all assigned parent tasks and their subtasks using @.dad/instructions/core/execute-subtask.md instructions, continuing until all tasks are complete.

<execution_flow>
LOAD @.dad/instructions/core/execute-subtask.md ONCE

FOR each parent_task assigned in Step 1:
EXECUTE instructions from execute-subtask.md with: - parent_task_number - all associated subtasks
WAIT for task completion
UPDATE subtasks.md status
END FOR
</execution_flow>

<loop_logic>
<continue_conditions> - More unfinished parent tasks exist - User has not requested stop
</continue_conditions>
<exit_conditions> - All assigned tasks marked complete - User requests early termination - Blocking issue prevents continuation
</exit_conditions>
</loop_logic>

<task_status_check>
AFTER each task execution:
CHECK subtasks.md for remaining tasks
IF all assigned tasks complete:
PROCEED to next step
ELSE:
CONTINUE with next task
</task_status_check>

<instructions>
  ACTION: Load execute-subtask.md instructions once at start
  REUSE: Same instructions for each parent task iteration
  LOOP: Through all assigned parent tasks
  UPDATE: Task status after each completion
  VERIFY: All tasks complete before proceeding
  HANDLE: Blocking issues appropriately
</instructions>

</step>

<step number="6" subagent="test-runner" name="test_suite_verification">

### Step 6: Full Test Suite & Code Quality Verification

Use the test-runner subagent to run the entire test suite AND perform comprehensive code quality verification to ensure no regressions and all code meets standards.

**MANDATORY VERIFICATION SEQUENCE:**

1. **Full Test Suite** (current focus)
2. **Type Checking** across all workspaces
3. **Linting** across all workspaces
4. **Build Verification** if applicable

All verification steps must pass before task completion.

<instructions>
  ACTION: Use test-runner subagent
  REQUEST: "Run the full test suite and perform comprehensive code quality verification including type-checking and linting across all workspaces"
  REFERENCE: Follow testing guidelines in `.dad/standards/testing-guidelines.md` for verification procedures
  ENFORCE: All verification steps must pass before proceeding
  WAIT: For test-runner analysis
  PROCESS: Fix any reported failures
  REPEAT: Until all tests pass
</instructions>

<test_execution>
<order> 1. Run entire test suite 2. Fix any failures
</order>
<requirement>100% pass rate</requirement>
</test_execution>

<failure_handling>
<action>troubleshoot and fix</action>
<priority>before proceeding</priority>
</failure_handling>

</step>

<step number="7" subagent="git-workflow" name="git_workflow">

### Step 7: Git Workflow (Interactive)

Present git workflow options to the user for review and approval before committing changes.

<workflow_prompt>
PRESENT: "All tasks are complete and tests are passing.

Would you like me to:

1. Commit, push, and create a PR now
2. Just commit locally (no push)
3. Skip git workflow (you'll handle it manually)

Please choose 1, 2, or 3."

WAIT for user response
</workflow_prompt>

<workflow_options>
IF user_chooses_1:
ACTION: Use git-workflow subagent
REQUEST: "Complete full git workflow for [TASK_NAME] feature: - Commit all changes - Push to remote - Create PR to main branch"
SAVE: PR URL for summary

IF user_chooses_2:
ACTION: Use git-workflow subagent
REQUEST: "Create local commit only for [TASK_NAME] feature"
NOTE: "Changes committed locally. Push when ready."

IF user_chooses_3:
SKIP: Git workflow entirely
NOTE: "Skipping git workflow. Changes remain uncommitted."
</workflow_options>

<instructions>
  ACTION: Ask user preference before git operations
  RESPECT: User's choice on git workflow
  FLEXIBLE: Allow manual review if desired
</instructions>

</step>

<step number="8" name="roadmap_progress_check">

### Step 8: Roadmap Progress Check (Conditional)

Check @.dad/product/roadmap.md (if not in context) and update roadmap progress only if the executed tasks may have completed a roadmap item and the task completes that item.

<conditional_execution>
<preliminary_check>
EVALUATE: Did executed tasks potentially complete a roadmap item?
IF NO:
SKIP this entire step
PROCEED to step 9
IF YES:
CONTINUE with roadmap check
</preliminary_check>
</conditional_execution>

<conditional_loading>
IF roadmap.md NOT already in context:
LOAD @.dad/product/roadmap.md
ELSE:
SKIP loading (use existing context)
</conditional_loading>

<roadmap_criteria>
<update_when> - task fully implements roadmap feature - all related tasks completed - tests passing
</update_when>
<caution>only mark complete if absolutely certain</caution>
</roadmap_criteria>

<instructions>
  ACTION: First evaluate if roadmap check is needed
  SKIP: If tasks clearly don't complete roadmap items
  CHECK: If roadmap.md already in context
  LOAD: Only if needed and not in context
  EVALUATE: If current task completes roadmap goals
  UPDATE: Mark roadmap items complete if applicable
  VERIFY: Certainty before marking complete
</instructions>

</step>

<step number="9" name="completion_notification">

### Step 9: Task Completion Notification

Play a system sound to alert the user that tasks are complete.

<notification_command>
afplay /System/Library/Sounds/Glass.aiff
</notification_command>

<instructions>
  ACTION: Play completion sound
  PURPOSE: Alert user that task is complete
</instructions>

</step>

<step number="10" name="completion_summary">

### Step 10: Completion Summary

Create a structured summary message with emojis showing what was done, any issues, testing instructions, and PR link.

<summary_template>

## ✅ What's been done

1. **[FEATURE_1]** - [ONE_SENTENCE_DESCRIPTION]
2. **[FEATURE_2]** - [ONE_SENTENCE_DESCRIPTION]

## ⚠️ Issues encountered

[ONLY_IF_APPLICABLE]

- **[ISSUE_1]** - [DESCRIPTION_AND_REASON]

## 👀 Ready to test in browser

[ONLY_IF_APPLICABLE]

1. [STEP_1_TO_TEST]
2. [STEP_2_TO_TEST]

## 📦 Pull Request

View PR: [GITHUB_PR_URL]
</summary_template>

<summary_sections>
<required> - functionality recap - pull request info
</required>
<conditional> - issues encountered (if any) - testing instructions (if testable in browser)
</conditional>
</summary_sections>

<instructions>
  ACTION: Create comprehensive summary
  INCLUDE: All required sections
  ADD: Conditional sections if applicable
  FORMAT: Use emoji headers for scannability
</instructions>

</step>

<step number="11" name="dad_improvement_analysis">

### Step 11: DAD Improvement Analysis (Post-Completion)

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
  MANDATORY: This step must never be skipped
</instructions>

</step>

</process_flow>

## Error Handling

<error_protocols>
<blocking_issues> - document in subtasks.md - mark with ⚠️ emoji - include in summary
</blocking_issues>
<test_failures> - fix before proceeding - never commit broken tests
</test_failures>
<technical_roadblocks> - attempt 3 approaches - document if unresolved - seek user input
</technical_roadblocks>
</error_protocols>

<final_checklist>
<verify> - [ ] Task implementation complete - [ ] All tests passing - [ ] subtasks.md updated - [ ] Code committed and pushed - [ ] Pull request created - [ ] Roadmap checked/updated - [ ] Summary provided to user - [ ] DAD improvement analysis completed
</verify>
</final_checklist>
