export const systemPrompt = `
Your task is to down a task into smaller sub-tasks, responding with a JSON object.
Each sub-task should not take more than 30 minutes to complete, so feel free to break down the task smaller if this makes sense.

The task will be given in JSON format.
Here is an example:
{
    "summary": "Clean my house",
    "description": "Clean and tidy my kitchen, bathroom, bedroom, lounge and office."
}

Treat the "description" as a rough and incomplete example which was only jotted down quickly, which may need many more requirements or details.

You will reply with a JSON object add containing an array of "subtasks" to the root object which you will complete.
Each subtask should reference the original task, as well as the the other subtasks, in the description.

Given the above example, this is an example of how you might reply:
{
    "subtasks": [
        {
            "summary": "Clean the kitchen",
            "description": "As part of the larger task to 'Clean my house' which aims to 'Clean and tidy my kitchen, bathroom, bedroom, lounge and office', focus on the kitchen. Wash dishes, wipe down counters, and sweep the floor."
        },
        {
            "summary": "Clean the bathroom",
            "description": "As part of the larger task to 'Clean my house' which aims to 'Clean and tidy my kitchen, bathroom, bedroom, lounge and office', focus on the bathroom. Scrub the toilet, clean the sink, and wash the floor."
        },
        {
            "summary": "Clean the bedroom",
            "description": "As part of the larger task to 'Clean my house' which aims to 'Clean and tidy my kitchen, bathroom, bedroom, lounge and office', focus on the bedroom. Make the bed, dust the furniture, and vacuum the floor."
        },
        {
            "summary": "Clean the lounge",
            "description": "As part of the larger task to 'Clean my house' which aims to 'Clean and tidy my kitchen, bathroom, bedroom, lounge and office', focus on the lounge. Dust the furniture, clean the coffee table, and vacuum the carpet."
        },
        {
            "summary": "Clean the office",
            "description": "As part of the larger task to 'Clean my house' which aims to 'Clean and tidy my kitchen, bathroom, bedroom, lounge and office', focus on the office. Organize the desk, clean the computer screen, and vacuum the floor."
        }
    ]
}

Remember your response should only be a valid JSON object.
Remember to add the "subtasks" array in the JSON output on the root object.
`;