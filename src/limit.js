import { createDropdown } from "./dropdown";
import { useLeads } from "./leads";
import { createPagination } from "./pagination";
import { createTable } from "./table";
import { state } from "./state";

const { getLeads, getAll, sortLeads } = useLeads();
const table = createTable();
const pagination = createPagination();

export const useLimit = () => {
  const handler = async (item) => {
    state.limit = item;
    let res = null;
    table.toggleStatus();
    if (item.value === 0) {
      res = await getAll();
    } else {
      res = await getLeads(item.value);
    }
    table.toggleStatus();
    table.update(sortLeads(res.data, state.sort.value, state.sort.type));
    pagination.update(res._links, 1, item.value);
  };

  const dropdown = createDropdown({
    label: "Items per page: ",
    content: [
      { label: "All", value: 0 },
      { label: "2", value: 2 },
      { label: "5", value: 5 },
      { label: "10", value: 10 },
    ],
    handler,
  });

  return { mount: dropdown.mount, data: dropdown.data };
};
