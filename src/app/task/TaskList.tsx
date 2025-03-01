import React, { useCallback } from "react";
import { Stack, Container } from "@mui/material";
import {
  AiOutlineFile,
  AiOutlineFileDone,
  AiOutlineFileText,
} from "react-icons/ai";
import { TaskStatus } from "@/interface/task.model";
import { useTaskContext } from "@/contexts/taskContext";
import { ColorsBase } from "@/theme/colorBase";
import SearchBar from "@/components/SearchBar";
import FilterTask from "@/components/FilterTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";

const TaskList = () => {
  const { tasks, filteredTasks, searchTasks, filterTasks } = useTaskContext();

  const displayedTasks = filteredTasks || tasks;

  const handleSearch = useCallback(
    (query: string) => {
      searchTasks(query);
    },
    [searchTasks]
  );

  const handleFilterChange = useCallback(
    (value: string) => {
      filterTasks(value);
    },
    [filterTasks]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          mt={4}
          mb={4}
          width="100%"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
        >
          <SearchBar onSearch={handleSearch} />
          <FilterTask onFilterChange={handleFilterChange} />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={2}
          sx={{ height: "calc(100vh - 100px)" }}
        >
          {[
            {
              status: TaskStatus.TODO,
              title: "To Do",
              color: ColorsBase.blue100,
              icon: AiOutlineFile,
              textColor: ColorsBase.blue500,
              showAddButton: true,
            },
            {
              status: TaskStatus.IN_PROGRESS,
              title: "In Progress",
              color: ColorsBase.yellow100,
              icon: AiOutlineFileText,
              textColor: ColorsBase.yellow500,
            },
            {
              status: TaskStatus.DONE,
              title: "Done",
              color: ColorsBase.green100,
              icon: AiOutlineFileDone,
              textColor: ColorsBase.green500,
            },
          ].map(
            ({
              status,
              title,
              color,
              icon: Icon,
              textColor,
              showAddButton,
            }) => (
              <TaskColumn
                key={status}
                status={status}
                title={title}
                color={color}
                Icon={Icon}
                textColor={textColor}
                showAddButton={showAddButton ?? false}
                tasks={displayedTasks.filter((task) => task.status === status)}
                showForm={false}
                openTaskId={null}
              />
            )
          )}
        </Stack>
      </Container>
    </DndProvider>
  );
};

export default TaskList;
