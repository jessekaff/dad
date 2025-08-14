---
description: Task Planning Rules for Development Accelerator Documentation (DAD)
globs:
alwaysApply: false
version: 1.1
encoding: UTF-8
---

# Task Planning Rules

## Overview

Generate detailed feature specifications aligned with product roadmap and mission.

<pre_flight_check>
EXECUTE: @.dad/instructions/meta/pre-flight.md
</pre_flight_check>

<process_flow>

<step number="1" subagent="context-fetcher" name="spec_initiation">

### Step 1: Task Initiation

Use the context-fetcher subagent to identify task initiation method. If no context is provided, ask the user for their preference.

<no_context_flow>
<trigger>user runs "plan-task" without additional context</trigger>
<actions>
ASK: "What would you like to plan?

1. Plan a specific new task (describe your idea)
2. Work on the next roadmap item

Please choose 1 or 2, or describe your task idea directly."
WAIT for user response
</actions>
</no_context_flow>

<option_a_flow>
<trigger>user chooses option 1 or describes specific task idea</trigger>
<accept>any format, length, or detail level</accept>
<proceed>to context gathering</proceed>
</option_a_flow>

<option_b_flow>
<trigger>user chooses option 2 or asks "what's next?"</trigger>
<actions> 1. CHECK @.dad/product/roadmap.md 2. FIND next uncompleted item 3. SUGGEST item to user 4. WAIT for approval
</actions>
</option_b_flow>

</step>

<step number="2" subagent="context-fetcher" name="context_gathering">

### Step 2: Context Gathering (Conditional)

Use the context-fetcher subagent to read @.dad/product/mission-lite.md and @.dad/product/tech-stack.md only if not already in context to ensure minimal context for task alignment.

<conditional_logic>
IF both mission-lite.md AND tech-stack.md already read in current context:
SKIP this entire step
PROCEED to step 3
ELSE:
READ only files not already in context: - mission-lite.md (if not in context) - tech-stack.md (if not in context)
CONTINUE with context analysis
</conditional_logic>

<context_analysis>
<mission_lite>core product purpose and value</mission_lite>
<tech_stack>technical requirements</tech_stack>
</context_analysis>

</step>

<step number="3" subagent="context-fetcher" name="requirements_clarification">

### Step 3: Requirements Clarification (Iterative)

Use the context-fetcher subagent to iteratively clarify scope boundaries and technical considerations. Continue asking questions until full understanding is achieved.

<clarification_process>

1. SUMMARIZE current understanding of the task
2. ASK numbered questions about unclear areas
3. WAIT for user response
4. INCORPORATE user answers
5. REPEAT until user confirms understanding is complete
   </clarification_process>

<clarification_areas>
<scope> - in_scope: what is included - out_of_scope: what is excluded (optional)
</scope>
<technical> - functionality specifics - UI/UX requirements - integration points
</technical>
<user_experience> - workflows and user journeys - edge cases and error handling - performance expectations
</user_experience>
</clarification_areas>

<iteration_loop>
WHILE requirements_not_fully_clear:
PRESENT: "Based on our discussion, here's my current understanding:
[BULLET_POINTS_OF_CURRENT_UNDERSTANDING]

I have these questions:
[NUMBERED_QUESTIONS]"

WAIT for_user_response
UPDATE understanding

ASK: "Is there anything else I should understand about this feature?"

IF user_says_no_or_confirms_complete:
PROCEED to_date_determination
ELSE:
CONTINUE iteration_loop
</iteration_loop>

</step>

<step number="4" subagent="file-creator" name="spec_folder_creation">

### Step 4: Task Folder Creation

First use the date-checker subagent to determine the current date in YYYY-MM-DD format, then use the file-creator subagent to create directory: .dad/tasks/YYYY-MM-DD-task-name/.

Use kebab-case for task name. Maximum 5 words in name.

<folder_naming>
<format>YYYY-MM-DD-task-name</format>
<date>use date from date-checker subagent</date>
<name_constraints> - max_words: 5 - style: kebab-case - descriptive: true
</name_constraints>
</folder_naming>

<example_names>

- 2025-03-15-password-reset-flow
- 2025-03-16-user-profile-dashboard
- 2025-03-17-api-rate-limiting
  </example_names>

</step>

<step number="5" subagent="file-creator" name="create_spec_md">

### Step 5: Create task.md

Use the file-creator subagent to create the file: .dad/tasks/YYYY-MM-DD-task-name/task.md using this template:

<file_template>

  <header>
    # Task Requirements Document

    > Task: [TASK_NAME]
    > Created: [CURRENT_DATE]

  </header>
  <required_sections>
    - Overview
    - User Stories
    - Task Scope
    - Out of Scope
    - Expected Deliverable
  </required_sections>
</file_template>

<section name="overview">
  <template>
    ## Overview

    [1-2_SENTENCE_GOAL_AND_OBJECTIVE]

  </template>
  <constraints>
    - length: 1-2 sentences
    - content: goal and objective
  </constraints>
  <example>
    Implement a secure password reset functionality that allows users to regain account access through email verification. This feature will reduce support ticket volume and improve user experience by providing self-service account recovery.
  </example>
</section>

<section name="user_stories">
  <template>
    ## User Stories

    ### [STORY_TITLE]

    As a [USER_TYPE], I want to [ACTION], so that [BENEFIT].

    [DETAILED_WORKFLOW_DESCRIPTION]

  </template>
  <constraints>
    - count: 1-3 stories
    - include: workflow and problem solved
    - format: title + story + details
  </constraints>
</section>

<section name="spec_scope">
  <template>
    ## Task Scope

    1. **[FEATURE_NAME]** - [ONE_SENTENCE_DESCRIPTION]
    2. **[FEATURE_NAME]** - [ONE_SENTENCE_DESCRIPTION]

  </template>
  <constraints>
    - count: 1-5 features
    - format: numbered list
    - description: one sentence each
  </constraints>
</section>

<section name="out_of_scope">
  <template>
    ## Out of Scope

    - [EXCLUDED_FUNCTIONALITY_1]
    - [EXCLUDED_FUNCTIONALITY_2]

  </template>
  <purpose>explicitly exclude functionalities</purpose>
</section>

<section name="expected_deliverable">
  <template>
    ## Expected Deliverable

    1. [TESTABLE_OUTCOME_1]
    2. [TESTABLE_OUTCOME_2]

  </template>
  <constraints>
    - count: 1-3 expectations
    - focus: browser-testable outcomes
  </constraints>
</section>

</step>

<step number="5.5" name="spec_revision">

### Step 5.5: Task Revision (Iterative)

Present the created task.md to the user for review and allow iterative revisions before proceeding.

<revision_process>
PRESENT: "I've created the initial task document. Here's what it contains:
[SUMMARY_OF_KEY_POINTS_FROM_TASK]

You can review the full task at: @.dad/tasks/YYYY-MM-DD-task-name/task.md

Would you like to:

1. Revise any section of the task
2. Add additional details
3. Proceed with this task as-is"

WAIT for user response

IF user_requests_changes:
ASK: "Which section would you like to revise? (Overview, User Stories, Scope, Out of Scope, or Expected Deliverable)"
APPLY revisions
PRESENT updated task
REPEAT until user approves
ELSE:
PROCEED to step 6
</revision_process>

</step>

<step number="6" subagent="file-creator" name="create_spec_lite_md">

### Step 6: Create task-lite.md

Use the file-creator subagent to create the file: .dad/tasks/YYYY-MM-DD-task-name/task-lite.md for the purpose of establishing a condensed task for efficient AI context usage.

<file_template>

  <header>
    # Task Summary (Lite)
  </header>
</file_template>

<content_structure>
<task_summary> - source: Step 5 task.md overview section - length: 1-3 sentences - content: core goal and objective of the feature
</task_summary>
</content_structure>

<content_template>
[1-3_SENTENCES_SUMMARIZING_TASK_GOAL_AND_OBJECTIVE]
</content_template>

<example>
  Implement secure password reset via email verification to reduce support tickets and enable self-service account recovery. Users can request a reset link, receive a time-limited token via email, and set a new password following security best practices.
</example>

</step>

<step number="7" subagent="file-creator" name="create_technical_spec">

### Step 7: Create Technical Specification

Use the file-creator subagent to create the file: specs/technical-spec.md using this template:

<file_template>

  <header>
    # Technical Specification

    This is the technical specification for the task detailed in @.dad/tasks/YYYY-MM-DD-task-name/task.md

  </header>
</file_template>

<spec_sections>
<technical_requirements> - functionality details - UI/UX specifications - integration requirements - performance criteria
</technical_requirements>
<external_dependencies_conditional> - only include if new dependencies needed - new libraries/packages - justification for each - version requirements
</external_dependencies_conditional>
</spec_sections>

<example_template>

## Technical Requirements

- [SPECIFIC_TECHNICAL_REQUIREMENT]
- [SPECIFIC_TECHNICAL_REQUIREMENT]

## External Dependencies (Conditional)

[ONLY_IF_NEW_DEPENDENCIES_NEEDED]

- **[LIBRARY_NAME]** - [PURPOSE]
- **Justification:** [REASON_FOR_INCLUSION]
  </example_template>

<conditional_logic>
IF task_requires_new_external_dependencies:
INCLUDE "External Dependencies" section
ELSE:
OMIT section entirely
</conditional_logic>

</step>

<step number="8" subagent="file-creator" name="create_database_schema">

### Step 8: Create Database Schema (Conditional)

Use the file-creator subagent to create the file: specs/database-schema.md ONLY IF database changes needed for this task.

<decision_tree>
IF task_requires_database_changes:
CREATE specs/database-schema.md
ELSE:
SKIP this_step
</decision_tree>

<file_template>

  <header>
    # Database Schema

    This is the database schema implementation for the task detailed in @.dad/tasks/YYYY-MM-DD-task-name/task.md

  </header>
</file_template>

<schema_sections>
<changes> - new tables - new columns - modifications - migrations
</changes>
<specifications> - exact SQL or migration syntax - indexes and constraints - foreign key relationships
</specifications>
<rationale> - reason for each change - performance considerations - data integrity rules
</rationale>
</schema_sections>

</step>

<step number="9" subagent="file-creator" name="create_api_spec">

### Step 9: Create API Specification (Conditional)

Use the file-creator subagent to create file: specs/api-spec.md ONLY IF API changes needed.

<decision_tree>
IF task_requires_api_changes:
CREATE specs/api-spec.md
ELSE:
SKIP this_step
</decision_tree>

<file_template>

  <header>
    # API Specification

    This is the API specification for the task detailed in @.dad/tasks/YYYY-MM-DD-task-name/task.md

  </header>
</file_template>

<api_sections>
<routes> - HTTP method - endpoint path - parameters - response format
</routes>
<controllers> - action names - business logic - error handling
</controllers>
<purpose> - endpoint rationale - integration with features
</purpose>
</api_sections>

<endpoint_template>

## Endpoints

### [HTTP_METHOD] [ENDPOINT_PATH]

**Purpose:** [DESCRIPTION]
**Parameters:** [LIST]
**Response:** [FORMAT]
**Errors:** [POSSIBLE_ERRORS]
</endpoint_template>

</step>

<step number="10" name="user_review">

### Step 10: User Review (All Specs)

Request user review of all created spec files, allowing iterative revisions before proceeding to subtask creation.

<review_request>
I've created the complete task documentation:

- Task Requirements: @.dad/tasks/YYYY-MM-DD-task-name/task.md
- Task Summary: @.dad/tasks/YYYY-MM-DD-task-name/task-lite.md
- Technical Spec: @.dad/tasks/YYYY-MM-DD-task-name/specs/technical-spec.md
  [LIST_OTHER_CREATED_SPECS]

Would you like to:

1. Review and revise any of these specs
2. Proceed to subtask breakdown creation
3. Add additional specifications

Please let me know which option you'd prefer.
</review_request>

<revision_loop>
IF user_chooses_option_1:
ASK: "Which spec would you like to revise?"
LOAD selected spec
ASK: "What changes would you like to make?"
APPLY revisions
SAVE updated spec
PRESENT: "Updated [SPEC_NAME]. Would you like to revise anything else?"
REPEAT until user is satisfied

IF user_chooses_option_2:
PROCEED to step 11 (create subtasks.md)

IF user_chooses_option_3:
ASK: "What additional specification would you like to add?"
CREATE new spec as requested
RETURN to review_request
</revision_loop>

</step>

<step number="11" subagent="file-creator" name="create_tasks">

### Step 11: Create subtasks.md

Use the file-creator subagent to await user approval from step 10 and then create file: subtasks.md

<file_template>

  <header>
    # Task Subtasks
  </header>
</file_template>

<task_structure>
<major_tasks> - count: 1-5 - format: numbered checklist - grouping: by feature or component
</major_tasks>
<subtasks> - count: up to 8 per major task - format: decimal notation (1.1, 1.2) - first_subtask: typically write tests - last_subtask: verify all tests pass
</subtasks>
</task_structure>

<task_template>

## Tasks

- [ ] 1. [MAJOR_TASK_DESCRIPTION]
  - [ ] 1.1 Write tests for [COMPONENT]
  - [ ] 1.2 [IMPLEMENTATION_STEP]
  - [ ] 1.3 [IMPLEMENTATION_STEP]
  - [ ] 1.4 Verify all tests pass

- [ ] 2. [MAJOR_TASK_DESCRIPTION] - [ ] 2.1 Write tests for [COMPONENT] - [ ] 2.2 [IMPLEMENTATION_STEP]
     </task_template>

<ordering_principles>

- Consider technical dependencies
- Follow TDD approach
- Group related functionality
- Build incrementally
  </ordering_principles>

</step>

<step number="11.5" name="tasks_revision">

### Step 11.5: Subtasks Revision (Iterative)

Present the created subtasks.md to the user for review and allow iterative revisions.

<revision_process>
PRESENT: "I've created the subtask breakdown with [NUMBER] major subtasks and their sub-subtasks.

You can review the full subtask list at: @.dad/tasks/YYYY-MM-DD-task-name/subtasks.md

Would you like to:

1. Revise the subtask breakdown
2. Add or remove subtasks
3. Reorder subtasks
4. Proceed with this subtask list"

WAIT for user response

IF user_requests_changes:
ASK: "What changes would you like to make to the subtasks?"
APPLY revisions
SAVE updated subtasks.md
PRESENT: "Updated subtask list. Anything else to adjust?"
REPEAT until user approves
ELSE:
PROCEED to step 12
</revision_process>

</step>

<step number="12" name="decision_documentation">

### Step 12: Decision Documentation (Conditional)

Evaluate strategic impact without loading decisions.md and update it only if there's significant deviation from mission/roadmap and user approves.

<conditional_reads>
IF mission-lite.md NOT in context:
USE: context-fetcher subagent
REQUEST: "Get product pitch from mission-lite.md"
IF roadmap.md NOT in context:
USE: context-fetcher subagent
REQUEST: "Get current development phase from roadmap.md"

<manual_reads>
<mission_lite> - IF NOT already in context: READ @.dad/product/mission-lite.md - IF already in context: SKIP reading
</mission_lite>
<roadmap> - IF NOT already in context: READ @.dad/product/roadmap.md - IF already in context: SKIP reading
</roadmap>
<decisions> - NEVER load decisions.md into context
</decisions>
</manual_reads>
</conditional_reads>

<decision_analysis>
<review_against> - @.dad/product/mission-lite.md (conditional) - @.dad/product/roadmap.md (conditional)
</review_against>
<criteria> - significantly deviates from mission in mission-lite.md - significantly changes or conflicts with roadmap.md
</criteria>
</decision_analysis>

<decision_tree>
IF task_does_NOT_significantly_deviate:
SKIP this entire step
STATE "Task aligns with mission and roadmap"
PROCEED to step 12
ELSE IF task_significantly_deviates:
EXPLAIN the significant deviation
ASK user: "This task significantly deviates from our mission/roadmap. Should I draft a decision entry?"
IF user_approves:
DRAFT decision entry
UPDATE decisions.md
ELSE:
SKIP updating decisions.md
PROCEED to step 12
</decision_tree>

<decision_template>

## [CURRENT_DATE]: [DECISION_TITLE]

**ID:** DEC-[NEXT_NUMBER]
**Status:** Accepted
**Category:** [technical/product/business/process]
**Related Task:** @.dad/tasks/YYYY-MM-DD-task-name/

### Decision

[DECISION_SUMMARY]

### Context

[WHY_THIS_DECISION_WAS_NEEDED]

### Deviation

[SPECIFIC_DEVIATION_FROM_MISSION_OR_ROADMAP]
</decision_template>

</step>

<step number="13" name="dad_improvement">

### Step 13: DAD Improvement Analysis

Analyze the planning session for potential DAD improvements based on user feedback and revisions.

<improvement_analysis>
REVIEW the entire planning session:

- User's clarifications and corrections
- Revisions made to tasks
- Patterns that emerged
- Gaps in DAD that caused confusion

EVALUATE potential improvements:

- Would any user feedback apply to future tasks?
- Did revisions reveal missing standards?
- Were there repeated clarifications that suggest DAD gaps?

APPLY strict criteria (lean towards LESS documentation):

- Only suggest if it would prevent future confusion
- Only suggest if pattern will likely repeat
- Avoid one-off or task-specific additions
- Prefer updating existing docs over creating new ones
  </improvement_analysis>

<improvement_prompt>
IF improvements_identified:
PRESENT: "Based on our planning session, I noticed [PATTERN/GAP].

I could update DAD to capture this for future tasks:
[SPECIFIC_SUGGESTION]

File to update: [DAD_FILE_PATH]

Would you like me to make this update?"

WAIT for user response

IF user_approves:
UPDATE specified DAD file
CONFIRM: "Updated [FILE] with [CHANGE]"
ELSE IF user_provides_alternative:
APPLY user's suggested change instead
ELSE:
SKIP DAD updates

ELSE:
SKIP this step silently
NOTE: No DAD improvements needed
</improvement_prompt>

<strict_criteria>
ONLY suggest improvements that:

- Address confusion that occurred multiple times
- Capture patterns you'll need in future tasks
- Fix genuine gaps in standards or instructions
- Would save time in future planning sessions

NEVER suggest improvements for:

- One-off project-specific details
- Temporary workarounds
- Personal preferences that don't affect quality
- Minor clarifications that won't recur
  </strict_criteria>

</step>

<step number="14" name="execution_readiness">

### Step 14: Execution Readiness Check

Evaluate readiness to begin implementation after completing all previous steps, presenting the first subtask summary and requesting user confirmation to proceed.

<readiness_summary>
<present_to_user> - Task name and description - First subtask summary from subtasks.md - Estimated complexity/scope - Key deliverables for subtask 1
</present_to_user>
</readiness_summary>

<execution_prompt>
PROMPT: "The task planning is complete. The first subtask is:

**Subtask 1:** [FIRST_SUBTASK_TITLE]
[BRIEF_DESCRIPTION_OF_SUBTASK_1_AND_SUB_SUBTASKS]

Would you like me to proceed with implementing Subtask 1? I will focus only on this first subtask and its sub-subtasks unless you specify otherwise.

Type 'yes' to proceed with Subtask 1, or let me know if you'd like to review or modify the plan first."
</execution_prompt>

<execution_flow>
IF user_confirms_yes:
REFERENCE: @.dad/instructions/core/execute-task.md
FOCUS: Only Subtask 1 and its sub-subtasks
CONSTRAINT: Do not proceed to additional subtasks without explicit user request
ELSE:
WAIT: For user clarification or modifications
</execution_flow>

</step>

</process_flow>

## Execution Standards

<standards>
  <follow>
    - @.dad/standards/best-practices.md
    - @.dad/standards/tech-stack.md
    - @.dad/standards/testing-guidelines.md
  </follow>
  <maintain>
    - Consistency with product mission
    - Alignment with roadmap
    - Technical coherence
  </maintain>
  <create>
    - Comprehensive documentation
    - Clear implementation path
    - Testable outcomes
  </create>
</standards>

<final_checklist>
<verify> - [ ] Accurate date determined via date-checker subagent - [ ] Task folder created with correct date prefix - [ ] task.md contains all required sections - [ ] All applicable specs created - [ ] User approved documentation - [ ] subtasks.md created with TDD approach - [ ] Cross-references added to task.md - [ ] Strategic decisions evaluated
</verify>
</final_checklist>
