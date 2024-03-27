## User Stories

- Create a list of tasks
  - Given I'm a user, I wish to have a list of tasks with a title and description
- Add a task
  - Given I'm a user, I wish to be able to add a task with a title and a description
- List all tasks
  - Given I'm a user, I wish to be able to list all my current tasks, with their titles, descriptions and complete state
- Update a task
  - Given I'm a user, I wish to be able to update the title and description of an existing task
- Delete a task
  - Given I'm a user, I wish to be able to delete a task from the list of current tasks
- Complete a task
  - Given I'm a user, I wish to be able to mark a task as complete

## Assumptions

- Task list is stored in memory
- Tasks can be duplicates
- Once a task is complete, it can't be changed back to incomplete
- Editing tasks doesn't modify any existing complete state

## Potential Future Improvements

- Persistance, store to a file or database
- Reordering items
- Proper menu system and UI
- Searching
- Packaging up into docker
- CI/CD (Github Actions)
- Turn into a REST server
- Proper mocking library to mock packages rather than overwriting in tests

## Running

`npm run start`

## Tests

`npm run test`

## Dependencies

- Chalk
  - Easily readable text colouring
- UUID
  - Unique ID per task (currently just used for editing, but could be used may other ways in the future)
- TSX
  - Execute Typescript directly without having a compilation step
