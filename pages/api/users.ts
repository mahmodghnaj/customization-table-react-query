import type { NextApiRequest, NextApiResponse } from "next";
import { faker, simpleFaker } from "@faker-js/faker"; // Remove curly braces

type PersonData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  dataJoin: string;
  status: "Online" | "Offline";
};

type ResponseData = {
  data: PersonData[];
  total?: number;
};

// Mock data for demonstration purposes
let mockData: PersonData[] = [];

for (let i = 0; i < 10000; i++) {
  const newData: PersonData = {
    id: simpleFaker.number.int(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    birthday: faker.date.past().toISOString().split("T")[0],
    dataJoin: faker.date.past().toISOString().split("T")[0],
    status: faker.datatype.boolean() ? "Online" : "Offline",
  };

  mockData.push(newData);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    let {
      limit = "50",
      page = "1", // Default to page 1 if not provided
      sortBy,
      sortOrder,
      total,
      ...filters
    } = req.query as {
      limit: string;
      page?: string;
      sortBy?: string;
      sortOrder?: string;
      total?: string;
      [key: string]: string | undefined;
    };
    if (parseInt(limit, 10) > 50) limit = "50";
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let filteredData = mockData;

    const filterData = (item: any, filters: any) => {
      return Object.keys(filters).every((key) =>
        item[key].toLowerCase().includes(filters[key].toString().toLowerCase())
      );
    };
    filteredData = filteredData.filter((item) => filterData(item, filters));

    if (sortBy) {
      filteredData.sort((a, b) => {
        const aValue = a[sortBy as keyof PersonData];
        const bValue = b[sortBy as keyof PersonData];

        if (sortOrder === "desc") {
          return bValue.localeCompare(aValue);
        } else {
          return aValue.localeCompare(bValue);
        }
      });
    }

    const limitedData = filteredData.slice(startIndex, endIndex);

    const responseData: ResponseData = {
      data: limitedData,
    };

    if (total) {
      responseData.total = filteredData.length;
    }

    res.status(200).json(responseData);
  } else if (req.method === "DELETE") {
    const { id } = req.query as { id: string };

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter" } as any);
    }

    // Find the index of the item with the specified ID in the mock data
    const index = mockData.findIndex((item) => item.id === parseInt(id, 10));

    if (index === -1) {
      return res.status(404).json({ message: "Item not found" } as any);
    }

    // Remove the item from the mock data
    mockData.splice(index, 1);

    res.status(200).json({ message: "Item deleted successfully" } as any);
  } else {
    res.status(405).json({ message: "Method Not Allowed" } as any);
  }
}
