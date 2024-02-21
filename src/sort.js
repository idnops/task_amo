import { createDropdown } from "./dropdown";
import { useLeads } from "./leads";
import { state } from "./state";
import { createTable } from "./table";

const table = createTable();

const { sortLeads, getAll, getLeads } = useLeads();

export const useSort = () => {
  const dropdown = createDropdown({
    label: "Sort by:",
    content: [
      { label: "Name", value: "name", type: "string" },
      { label: "Budget", value: "price", type: "number" },
    ],
    handler: async (item) => {
      state.sort = item;
      let res = null;
      table.toggleStatus();
      if (state.value === 0) {
        res = await getAll();
      } else {
        res = await getLeads(state.limit.value);
      }
      const sorted = sortLeads(res.data, item.value, item.type);

      table.toggleStatus();
      table.update(sorted);
    },
  });

  return { mount: dropdown.mount, data: dropdown.data };
};
