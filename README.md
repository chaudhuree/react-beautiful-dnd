## for dynamic data from api we will do things like this:

### suppose api is this: https://todos.com/api/v1/todos

### and it will return data like this:

```json
{
  "todos": [
    [
      { "id": 1, "content": "Configure Next.js application", "status": "todo" },
      {
        "id": 2,
        "content": "Configure Next.js and tailwind",
        "status": "todo"
      },
      {
        "id": 3,
        "content": "Create sidebar navigation menu",
        "status": "inprogress"
      },
      { "id": 4, "content": "Create page footer", "status": "todo" },
      { "id": 5, "content": "Create page navigation menu", "status": "todo" },
      { "id": 6, "content": "Create page layout", "status": "completed" }
    ]
  ]
}
```

then we will do this:

```js
const [state, setState] = useState({
  columns: {},
  columnOrder: [],
});
```

```js
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://todos.com/api/v1/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      // Organize tasks into columns based on status
      const tasks = data.todos;
      const columns = {
        "column-1": {
          id: "column-1",
          title: "TODO",
          taskLists: tasks.filter((task) => task.status === "todo"),
        },
        "column-2": {
          id: "column-2",
          title: "INPROGRESS",
          taskLists: tasks.filter((task) => task.status === "inprogress"),
        },
        "column-3": {
          id: "column-3",
          title: "COMPLETED",
          taskLists: tasks.filter((task) => task.status === "completed"),
        },
      };

      const columnOrder = ["column-1", "column-2", "column-3"];
      setState({ columns, columnOrder });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

}, []);

```
