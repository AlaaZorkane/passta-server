declare namespace Passta {
  interface Config {
    PORT: number;
    PASETO_SECRET: string | Buffer;
    PASETO_EXPIRE: string;
  }
  interface PASETOPayload {
    key: string;
  }
  interface Context {
    req: import("express").Request;
    res: import("express").Response;
    payload: PASETOPayload;
  }
}
