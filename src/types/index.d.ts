import { SupabaseService } from "../services/supabase.js";
import ExtendAuthorizationHeader from "../providers/request/authorizationHeader";
import { IFileResponse } from "../providers/response/file.js";
import { IJsonResponse } from "../providers/response/json";
import { IViewResponseProvider } from "../providers/response/view.js";
import { SupabaseClient } from "@supabase/supabase-js";

declare global {
  namespace NodeJS {
  }

  namespace Express {
    interface Request {
      Authorization: ExtendAuthorizationHeader;
      client: any, // ! do not use -user- for this name, because of conflict with user in social passport
      disk?: TDisk
      storage: Storage
    }

    interface Response {
      Json: IJsonResponse,
      File: IFileResponse,
      View: IViewResponseProvider
    }

    interface Application {
      get(key: 'supabase'): SupabaseClient;
      set(key: 'supabase', value: SupabaseClient): void;
    }
  }
}
