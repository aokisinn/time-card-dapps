import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";
import { v4 as uuidv4 } from "uuid";

const nonceApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { walletAddres } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("nonce")
    .eq("wallet_address", walletAddres)
    .single();

  const nonce = uuidv4();

  if (data) {
    const { data: updateUser, error: updateUserError } = await supabase
      .from("users")
      .update({ nonce })
      .match({ wallet_address: walletAddres });

    if (updateUserError) {
      res.status(400).json({ error: updateUserError.message });
    } else {
      res.status(200).json({ nonce });
    }
  } else {
    const { data: newUser, error: newUserError } = await supabase
      .from("users")
      .insert({ nonce, wallet_address: walletAddres });
    if (newUserError) {
      res.status(400).json({ error: newUserError.message });
    } else {
      res.status(200).json({ nonce });
    }
  }
};

export default nonceApi;
