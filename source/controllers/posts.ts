/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import * as jsonData from "../../public/data.json";

const data = (<any>jsonData).Sheet1;
console.log(data); // output 'testing'

interface Post {
   Voornaam: String,
   Achternaam: String,
   Leeftijd: Number,
   Vak: String,
   Email: String,
   Telefoon: Number,
   Werkdagen: String
}

const getByName = (req: Request, res: Response, next: NextFunction) => {
   // // get the post voornaam from the req
   let name: string = req.params.Voornaam;
   let result = data;
   console.log(data.name)
   let posts: Post = result;
   return res.status(200).json({
       message: posts
  });
}

const getData = (req: Request, res: Response, next: NextFunction) => {
   return res.status(200).json({
       message: data
  });
};

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost, getData, getByName };
