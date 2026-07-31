import urllib.request
import re
import urllib.parse

def get_tenor_gif(query):
    url = f'https://tenor.com/search/{urllib.parse.quote(query.replace(" ", "-"))}-gifs'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode()
            match = re.search(r'https://media\.tenor\.com/[^\"\']+\.gif', html)
            if match:
                return match.group(0)
    except Exception as e:
        return str(e)
    return 'None'

exercises = ['Dumbbell Bench Press', 'Incline Dumbbell Press', 'Seated Dumbbell Press', 'Dumbbell Lateral Raise', 'Overhead Tricep Extension', 'Tricep Pushdown']
for ex in exercises:
    print(ex + ': ' + get_tenor_gif(ex))
