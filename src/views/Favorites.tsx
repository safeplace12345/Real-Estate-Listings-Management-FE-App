import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../services/@redux";
import { api } from "../services/api";
import { addToFavList, deleteFromFavList, IFav } from "../services/@redux/userReducer";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";


export default function Favorites() {
    const fav = useSelector((state: RootState) => state.user.favorites)
    const email = useSelector((state: RootState) => state.user.email)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    
    const getUser = async () => {
        if(!email) return navigator("/home")

        return api.getUser(email).then(
            (data) => {
                console.log({ data })
                if (data !== 'Server Error') {
                    dispatch(addToFavList(data.favorites))
                }
            }
        )
    }
    
    const deleteFav = async (index: number) => {
        if (fav) {
            return await api.deleteFavorites(fav[index]).then(
                (data: any) => {
                    if (data !== 'Server Error') {
                        return dispatch(deleteFromFavList(index))
                    }
                    alert("Ooops something went wrong")
                })
        }
    }

    const openFav = async (row: any) => {
        // Create a view Listing endpoint to visualize any listing
        alert("View more features coming soon")
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Grid container rowSpacing={3}>
            {fav && fav.map((row, i) => (
                <Grid item xs={3} key={i}>
                    <Card sx={{ maxWidth: 300, minHeight: 300 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {row.type}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {row.address}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {row.brokerTitle}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" onClick={() => openFav(row)}>
                                View Details
                            </Button>
                            <Button variant="outlined" onClick={() => deleteFav(i)}>
                                Delete Item
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid >

    );
}
