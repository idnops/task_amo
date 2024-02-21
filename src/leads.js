import Cookies from "js-cookie";
import { fetch } from "./fetch";
import sleep from "./sleep";

export const useLeads = () => {
  const getAll = async () => {
    const leads = [];

    const rec = async (page = 1) => {
      const res = await getLeads(5, page);
      leads.push(...res.data);
      if (!res._links.next) {
        return;
      }

      await sleep(500, rec, res._page + 1);
    };

    await rec();

    return {
      data: leads,
      _page: 1,
      _links: {
        self: "",
      },
    };
  };

  const getLeads = async (limit, page = 1) => {
    const res = await fetch("api/leads", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      params: {
        limit,
        page,
      },
    });
    return {
      data: transformLeads(res.data._embedded.leads),
      ...res.data,
    };
  };

  const transformLeads = (leads) => {
    return leads.map(
      ({
        group_id,
        loss_reason_id,
        closed_at,
        closest_task_at,
        custom_fields_values,
        score,
        labor_cost,
        _links,
        _embedded,
        ...rest
      }) => {
        return rest;
      }
    );
  };

  const sortLeads = (data, field, type) => {
    const sorted = data.sort((a, b) => {
      if (type === "number") {
        return parseFloat(a[field]) - parseFloat(b[field]);
      } else if (type === "string") {
        if (a[field] > b[field]) return 1;
        if (a[field] < b[field]) return -1;
      } else {
        return 0;
      }
    });

    return sorted;
  };

  return { getAll, getLeads, sortLeads };
};
