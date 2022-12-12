import { hash } from "bcrypt";
import prisma from "../../../lib/prisma";
import { parseForm, FormidableError } from "../../../lib/parseForm";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }

  try {
    const { fields, files } = await parseForm(req);
    const file = files.media;

    let govIdUrl = Array.isArray(file)
      ? file.map((f) => f.newFilename)
      : file.newFilename;
    const result = await prisma.user.create({
      data: {
        name: fields.name,
        govId: await hash(fields.govId, 12),
        email: fields.email,
        phone: fields.phone,
        remarks: fields.remarks,
        govIdUrl: "/uploads/" + govIdUrl,
      },
    });
    res.status(200).json({
      data: result,
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
