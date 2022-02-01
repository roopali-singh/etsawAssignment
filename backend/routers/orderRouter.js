import express from "express";
import { request } from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/createOrder",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    if (request.body.order.orderItems.length === 0) {
      response.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: request.body.order.orderItems,
        shippingAddress: request.body.order.shippingAddress,
        orderTotal: request.body.orderTotal,
        user: request.user._id,
      });

      const createdOrder = await order.save();

      response.status(201).send({ createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  expressAsyncHandler(async (request, response) => {
    const userOrderDetails = await Order.findById(request.params.id);
    if (userOrderDetails) {
      response.send(userOrderDetails);
    } else {
      response.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
