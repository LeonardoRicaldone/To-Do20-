import taskModel from "../models/Task.js";

const taskController = {};

//GET
taskController.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

//GET por id
taskController.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(400).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task", error });
  }
};

//POST
taskController.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    //Volvi a poner las validaciones aqui aunque ya esten en el modelo
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    if (title.length < 3 || title.length > 50) {
      return res
        .status(400)
        .json({ message: "Title must be between 3 and 50 characters" });
    }

    if (description.length < 5 || description.length > 200) {
      return res
        .status(400)
        .json({ message: "Description must be between 5 and 200 characters" });
    }
    ;

    const newTask = new taskModel({ title, description}); // no puese completed porque es false por defecto
    await newTask.save();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

//PUT
taskController.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    // Validaciones
    if (title.length < 3 || title.length > 50) {
      return res
        .status(400)
        .json({ message: "Title must be between 3 and 50 characters" });
    }
    if (description.length < 5 || description.length > 200) {
      return res
        .status(400)
        .json({ message: "Description must be between 5 and 200 characters" });
    }
    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "Completed must be a boolean" });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(400).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

//DELETE
taskController.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await taskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(400).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

export default taskController;