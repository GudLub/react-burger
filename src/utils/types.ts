export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
    [key in TDataKey]: TDataType;
  } & {
    success: boolean;
    message?: string;
    headers?: Headers;
    refreshToken: string;
    accessToken: string;
  };

  export type THeaders = {
    authorization: string | null;
    "Content-Type": string;
  };

  export type TOrder = {
    number: number;
    name: string;
    success: boolean;
  };

  export type TStatus = "created" | "pending" | "done";
  
  export type TWsOrder = {
    success: boolean;
    _id: string;
    ingredients: string[];
    status: TStatus;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  }

  export type TUser = {
    name: string;
    email: string;
    password: string;
  }

  export type TRegisterPost = {
    email: string;
    password: string;
    name: string;
  }

  export type TResetPassword = {
    password: string;
    token: string;
  }


  export type TLogin = {
    email: string;
    password: string;
  }


  export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid: string;
    index: number;
  }

  export type TPatchUserResponse = {
    success: boolean;
    user: {
      email: string;
      name: string;
    }
  }

  export type TRegisterResponse = TPatchUserResponse & {
    accessToken: string;
    refreshToken: string;
  }