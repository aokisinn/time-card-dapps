import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";

const wallet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { walletAddress, signature, nonce } = req.body;
    const signatureAddress = ethers.utils.verifyMessage(nonce, signature);

    if (signatureAddress !== walletAddress) {
      throw new Error("wrong_signature");
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("wallet_address", walletAddress)
      .eq("nonce", nonce)
      .single();

    // JWT トークン作成
    const token = jwt.sign(
      {
        aud: "authenticated",
        exp: Math.floor(Date.now() / 1000 + 60 * 60),
        sub: data.id,
        user_matadata: {
          id: data.id,
        },
        role: "authenticated",
      },
      process.env.SUPABASE_JWT_SECRET || ""
    );

    console.log(token);
    res.status(200).json({ data, token });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export default wallet;
