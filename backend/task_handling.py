import json

from datetime import datetime

# functionality around task scheduling, task prioritization etc.
def order_tasks(user_id=None, user_name=None):


    # replace this later with db access
    with open('dummy_data.json') as task_file:
        tasks_str = task_file.read()
        # tasks = json.load(task_file)
        tasks = json.loads(tasks_str)

        for task in tasks:
            # task_urgency = int(task["content"]["urgency"])
            # task_importance = int(task["content"]["importance"])
            # task_fun_factor = int(task["content"]["fun_factor"])

            # task_score = task_urgency * task_importance + task_fun_factor
            
            # task["content"]["score"] = task_score
            task_deadline_str = task["content"]["deadline"]
            task_deadline = datetime.strptime(task_deadline_str, '%Y-%m-%d_%H:%M')
            task["content"]["deadline"] = task_deadline
            
            # print(task_deadline)    
        # sorted_tasks = sorted(tasks, key=lambda task: task["content"]["score"])
        sorted_tasks = sorted(tasks, key=lambda task: task["content"]["deadline"])


    return sorted_tasks
