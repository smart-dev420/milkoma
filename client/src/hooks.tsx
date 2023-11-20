import { useQuery, useMutation } from "@tanstack/react-query";
import { fetcher, poster, API } from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./slices/auth";
