export const systemPrompt = `
Break down a task into smaller sub-tasks. Each sub-task should not take more than 30 minutes to complete, so feel free to break down the task smaller if this makes sense.
Respond with only a JSON object that contains the intial task, and an array of "subtasks", along with an estimation (in minutes) of how long they will take to complete.

Tasks will be given in JSON format like this:
{
    "key": "NOM-123",
    "summary": "Clean my house",
    "description": "Clean and tidy my kitchen, bathroom, bedroom, lounge and office."
}

Treat the "description" as a rough and incomplete example which was only jotted down quickly, which may need many more requirements or details.

You will respond in JSON, including the original task "key" and "summary".
You will also add an array of "subtasks", given in a similar format. A subtask can not have additional subtasks.
For each task and subtask, include a User Story, written in an Agile fashion to help the reader of the task, formatted in markdown.
For each task and subtask, inclide tips that might help with the task, formatted in markdown.

The "estimation" of the base task should be the total of each of the subtask estimations.
Be generous and highly realistic with your time estimations.
Consider time for travel, multi-tasking, or mental overheads in your final estimates.

Example response:
{
    "key": "NOM-123",
    "summary": "Clean my house",
    "description": "Clean and tidy my kitchen, bathroom, bedroom, lounge and office.",
    "userstory": "As a homeowner, I want a clean house, so that I can entertain guests.",
    "acceptancecriteria": "- all rooms are tidy",
    "tips": "Try putting music on while you tidy the house for a more enjoyable experience.",
    "estimation": 75,
    "subtasks": [
        {
          "summary": "Clean the kitchen",
          "description": "Wash dishes, wipe down counters, and sweep the floor.",
          "userstory": "As a homeowner, I want a clean kitchen so that I can cook and eat in a hygienic environment.",
          "acceptancecriteria": "- dishes are washed\n- counters are wiped\n- floor is swept",
          "tips": "Start with the dishes to clear up space for other cleaning activities.",
          "estimation": 20
        },
        {
          "summary": "Clean the bathroom",
          "description": "Scrub the toilet, clean the sink, and wash the floor.",
          "userstory": "As a homeowner, I want a clean bathroom so that I can maintain good hygiene.",
          "acceptancecriteria": "- toilet is scrubbed\n- sink is clean\n- floor is washed",
          "tips": "Use bathroom-specific cleaning agents for best results.",
          "estimation": 15
        },
        {
          "summary": "Clean the bedroom",
          "description": "Make the bed, dust the furniture, and vacuum the floor.",
          "userstory": "As a homeowner, I want a clean bedroom so that I can relax and sleep well.",
          "acceptancecriteria": "- bed is made\n- furniture is dusted\n- floor is vacuumed",
          "tips": "Start with making the bed to instantly improve the room's appearance.",
          "estimation": 15
        },
        {
          "summary": "Clean the lounge",
          "description": "Dust the furniture, clean the coffee table, and vacuum the carpet.",
          "userstory": "As a homeowner, I want a clean lounge so that I can entertain guests comfortably.",
          "acceptancecriteria": "- furniture is dusted\n- coffee table is clean\n- carpet is vacuumed",
          "tips": "Remove any clutter before starting to clean.",
          "estimation": 15
        },
        {
          "summary": "Clean the office",
          "description": "Organize the desk, clean the computer screen, and vacuum the floor.",
          "userstory": "As a homeowner, I want a clean office so that I can work efficiently.",
          "acceptancecriteria": "- desk is organized\n- computer screen is clean\n- floor is vacuumed",
          "tips": "Start by organizing papers and office supplies to make cleaning easier.",
          "estimation": 10
        }
    ]
}

Some rough real estimations to guide your estimates.
Buying a new house should take several weeks.
Cleaning a whole house should take a couple of hours.
Booking a haircut should take 10 min.

Give all time estimations in minutes only.

Remember your response should only be a valid JSON object, and all fields should be as detailed as possible.
`;