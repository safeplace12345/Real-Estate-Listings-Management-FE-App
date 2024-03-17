import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { RootState } from "../services/@redux";
import { setListings } from "../services/@redux/listingsReducer";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from "../components/Dialog"
import { IListing } from "../services/@redux/listingsReducer";
import { addToFavList } from "../services/@redux/userReducer";
import { IFav } from "../services/@redux/userReducer";

import { api } from "../services/api";
import { createData } from "../utils";

export default function Home() {
    const listings = useSelector((state: RootState) => state.listings)
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState("");
    const [activeItem, setActiveItem] = useState<any>({});

    const handleClickOpen = (row: IListing) => {
        setActiveItem(row)
        setOpen(true);
    };

    const handleAddToFav = async (row: IFav) => {
        return await api.updateFavorites(row)
    };
    const handleSort = (header: string) => {
        const filter = `${header.split("&")[0].toLowerCase()}`
        console.log(filter)

    }

    const syncListings = async () => {
        const data = await api.getListings(1)
        if (Array.isArray(data)) {
            const mapped = data.map(({
                brokerTitle,
                type,
                price,
                beds,
                bath,
                propertySqft,
                address
            }: IListing) => createData(
                brokerTitle,
                type,
                price,
                beds,
                bath,
                propertySqft,
                address))
            return dispatch(setListings(mapped))
        } else {
            return navigator("/")
        }
    }
    const headers = ["Type", "Price&nbsp;(&#8364;)", "Bedrooms", "Bathrooms", "Property Sqft&nbsp;(ft)", "Address", "Edit", "Add To Favorites"]
    useEffect(() => {
        syncListings()
    }, [])

    return (
        <>
            <Dialog open={open} setOpen={setOpen} item={activeItem} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map(header => (
                                <TableCell onClick={() => handleSort(header)}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listings.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.brokerTitle}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.price}
                                </TableCell>
                                <TableCell align="right">{row.beds}</TableCell>
                                <TableCell align="right">{row.bath}</TableCell>
                                <TableCell align="right">{row.propertySqft}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => handleClickOpen(row)}>
                                        Edit Item
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => handleAddToFav(row)}>
                                        Add to Favorites
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
