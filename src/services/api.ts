import { IFav } from "./@redux/userReducer";

class ApiService {
  url: string;
  listings: any;
  user: any;
  headers: any;
  token: string | null = "";

  constructor(url: string) {
    this.url = url;
    this.token = localStorage.getItem("token");
    this.headers = {
      Accept: "*/*",
      Authorization: this.token,
      "Content-Type": "application/json",
    };
  }

  async setToken(token: string) {
    this.token = `Bearer ${token}`;
    this.headers.Authorization = this.token;
    localStorage.setItem("token", this.token);
    return console.warn("Token setting Success");
  }

  async ping() {
    // For gaming servers polling features if not PubSub
    return await fetch(this.url)
      .then(() => "Server alive")
      .catch((e) => {
        console.log(e);
        return "Server Error";
      });
  }
  
  async getUser(email: string) {
    return await fetch(`${this.url}users/${email}`, {
      headers: this.headers,
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        return "Server Error";
      });
  }

  async Login(email: string) {
    return await fetch(`${this.url}users/login`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: this.headers,
    })
      .then((data) => data.json())
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        return "Server Error";
      });
  }

  async SignUp(name: string, email: string) {
    let bodyContent = JSON.stringify({
      name,
      email,
    });
    return await fetch(`${this.url}users/create`, {
      method: "POST",
      body: bodyContent,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        if (data.status === 200) return data.json();
        return data.text()
      })
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        return "Server Error";
      });
  }
  async getListings(page: number, filters?: string) {
    return await fetch(`${this.url}listings/all?perPage=5&page=${page}&${filters}`, {
      headers: this.headers,
    })
      .then((data) => {
        if (data.status === 200) return data.json();
        return data;
      })
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        return "Server Error";
      });
  }
  async updateListing(listing: any) {
    return await fetch(`${this.url}listings/update`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(listing),
    })
      .then((data) => {
        if (data.status === 200) return data.json();
        return data;
      })
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        return "Server Error";
      });
  }
  async updateFavorites(fav: IFav) {
    return await fetch(`${this.url}users/favorites`, {
      headers: this.headers,
      method: "PUT",
      body: JSON.stringify({ fav: [fav] }),
    })
      .then((data) => {
        if (data.status === 200) return data.json();
        return data;
      })
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        return "Server Error";
      });
  }
  async deleteFavorites(fav: IFav) {
    return await fetch(`${this.url}users/favorites`, {
      headers: this.headers,
      method: "DELETE",
      body: JSON.stringify({ fav: [fav] }),
    })
      .then((data) => data.json())
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        return "Server Error";
      });
  }
}

export const api = new ApiService(process.env.URL || "http://localhost:4000/");
