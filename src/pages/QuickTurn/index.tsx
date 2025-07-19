"use client";
import { ChangeEvent, useState } from "react";
import Input from "../../theme/Input";
import SelectBox from "../../theme/SelectBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper/modules";
import Button from "../../theme/Button";

const months = [
  { id: "1", title: "فروردین" },
  { id: "2", title: "اردیبهشت" },
  { id: "3", title: "خرداد" },
  { id: "4", title: "تیر" },
  { id: "5", title: "مرداد" },
  { id: "6", title: "شهریور" },
  { id: "7", title: "مهر" },
  { id: "8", title: "آبان" },
  { id: "9", title: "آذر" },
  { id: "10", title: "بهمن" },
  { id: "11", title: "اسفند" },
];
const days = [
  { id: "1", title: "شنبه", dayNumber: "01" },
  { id: "2", title: "یکشنبه", dayNumber: "02" },
  { id: "3", title: "دوشنبه", dayNumber: "03" },
  { id: "4", title: "سه شنبه", dayNumber: "04", isClosed: true },
  { id: "5", title: "چهارشنبه", dayNumber: "05" },
  { id: "6", title: "پنجشنبه", dayNumber: "06" },
  { id: "7", title: "جمعه", dayNumber: "07" },
  { id: "8", title: "شنبه", dayNumber: "08" },
  { id: "9", title: "یکشنبه", dayNumber: "09" },
  { id: "10", title: "دوشنبه", dayNumber: "10" },
  { id: "11", title: "سه شنبه", dayNumber: "11" },
  { id: "12", title: "چهارشنبه", dayNumber: "12" },
  { id: "13", title: "پنجشنبه", dayNumber: "13" },
  { id: "14", title: "جمعه", dayNumber: "14" },
];
const hours = [
  {
    id: "1",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "2",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۱۳:۰۰" },
          { id: "2", title: "۱۳:۳۰" },
          { id: "3", title: "۱۴:۰۰" },
          { id: "4", title: "۱۴:۳۰" },
          { id: "5", title: "۱۵:۰۰" },
          { id: "6", title: "۱۵:۳۰" },
          { id: "7", title: "۱۶:۰۰" },
          { id: "8", title: "۱۶:۳۰" },
          { id: "9", title: "۱۷ :۰۰" },
          { id: "10", title: "۱۷:۳۰" },
          { id: "11", title: "۱۸:۰۰" },
          { id: "12", title: "۱۸ :۳۰" },
          { id: "13", title: "۱۹:۰۰" },
          { id: "14", title: "۱۹:۳۰" },
          { id: "15", title: "۲۰:۰۰" },
          { id: "16", title: "۲۰ :۳۰" },
          { id: "17", title: "۲۱:۰۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "18", title: "۰۸:۰۰" },
          { id: "19", title: "۰۸:۳۰" },
          { id: "20", title: "۰۹:۰۰" },
          { id: "21", title: "۰۹:۳۰" },
          { id: "22", title: "۱۰:۰۰" },
          { id: "23", title: "۱۰:۳۰" },
          { id: "24", title: "۱۱:۰۰" },
          { id: "25", title: "۱۱:۳۰" },
          { id: "26", title: "۱۲:۰۰" },
          { id: "27", title: "۱۲:۳۰" },
        ],
      },
    ],
  },
  {
    id: "3",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "4",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۱۳:۰۰" },
          { id: "2", title: "۱۳:۳۰" },
          { id: "3", title: "۱۴:۰۰" },
          { id: "4", title: "۱۴:۳۰" },
          { id: "5", title: "۱۵:۰۰" },
          { id: "6", title: "۱۵:۳۰" },
          { id: "7", title: "۱۶:۰۰" },
          { id: "8", title: "۱۶:۳۰" },
          { id: "9", title: "۱۷ :۰۰" },
          { id: "10", title: "۱۷:۳۰" },
          { id: "11", title: "۱۸:۰۰" },
          { id: "12", title: "۱۸ :۳۰" },
          { id: "13", title: "۱۹:۰۰" },
          { id: "14", title: "۱۹:۳۰" },
          { id: "15", title: "۲۰:۰۰" },
          { id: "16", title: "۲۰ :۳۰" },
          { id: "17", title: "۲۱:۰۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "18", title: "۰۸:۰۰" },
          { id: "19", title: "۰۸:۳۰" },
          { id: "20", title: "۰۹:۰۰" },
          { id: "21", title: "۰۹:۳۰" },
          { id: "22", title: "۱۰:۰۰" },
          { id: "23", title: "۱۰:۳۰" },
          { id: "24", title: "۱۱:۰۰" },
          { id: "25", title: "۱۱:۳۰" },
          { id: "26", title: "۱۲:۰۰" },
          { id: "27", title: "۱۲:۳۰" },
        ],
      },
    ],
  },
  {
    id: "5",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "6",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۱۳:۰۰" },
          { id: "2", title: "۱۳:۳۰" },
          { id: "3", title: "۱۴:۰۰" },
          { id: "4", title: "۱۴:۳۰" },
          { id: "5", title: "۱۵:۰۰" },
          { id: "6", title: "۱۵:۳۰" },
          { id: "7", title: "۱۶:۰۰" },
          { id: "8", title: "۱۶:۳۰" },
          { id: "9", title: "۱۷ :۰۰" },
          { id: "10", title: "۱۷:۳۰" },
          { id: "11", title: "۱۸:۰۰" },
          { id: "12", title: "۱۸ :۳۰" },
          { id: "13", title: "۱۹:۰۰" },
          { id: "14", title: "۱۹:۳۰" },
          { id: "15", title: "۲۰:۰۰" },
          { id: "16", title: "۲۰ :۳۰" },
          { id: "17", title: "۲۱:۰۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "18", title: "۰۸:۰۰" },
          { id: "19", title: "۰۸:۳۰" },
          { id: "20", title: "۰۹:۰۰" },
          { id: "21", title: "۰۹:۳۰" },
          { id: "22", title: "۱۰:۰۰" },
          { id: "23", title: "۱۰:۳۰" },
          { id: "24", title: "۱۱:۰۰" },
          { id: "25", title: "۱۱:۳۰" },
          { id: "26", title: "۱۲:۰۰" },
          { id: "27", title: "۱۲:۳۰" },
        ],
      },
    ],
  },
  {
    id: "6",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "7",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "8",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "9",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "10",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "11",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "12",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
  {
    id: "14",
    items: [
      {
        id: "1",
        title: "صبح",
        hours: [
          { id: "1", title: "۰۸:۰۰" },
          { id: "2", title: "۰۸:۳۰" },
          { id: "3", title: "۰۹:۰۰" },
          { id: "4", title: "۰۹:۳۰" },
          { id: "5", title: "۱۰:۰۰" },
          { id: "6", title: "۱۰:۳۰" },
          { id: "7", title: "۱۱:۰۰" },
          { id: "8", title: "۱۱:۳۰" },
          { id: "9", title: "۱۲:۰۰" },
          { id: "10", title: "۱۲:۳۰" },
        ],
      },
      {
        id: "2",
        title: "بعدازظهر",
        hours: [
          { id: "11", title: "۱۳:۰۰" },
          { id: "12", title: "۱۳:۳۰" },
          { id: "13", title: "۱۴:۰۰" },
          { id: "14", title: "۱۴:۳۰" },
          { id: "15", title: "۱۵:۰۰" },
          { id: "16", title: "۱۵:۳۰" },
          { id: "17", title: "۱۶:۰۰" },
          { id: "18", title: "۱۶:۳۰" },
          { id: "19", title: "۱۷ :۰۰" },
          { id: "20", title: "۱۷:۳۰" },
          { id: "21", title: "۱۸:۰۰" },
          { id: "22", title: "۱۸ :۳۰" },
          { id: "23", title: "۱۹:۰۰" },
          { id: "24", title: "۱۹:۳۰" },
          { id: "25", title: "۲۰:۰۰" },
          { id: "26", title: "۲۰ :۳۰" },
          { id: "27", title: "۲۱:۰۰" },
        ],
      },
    ],
  },
];

const branches = [
  { id: '0', title: "شعبه 1" },
  { id: '1', title: "شعبه 2" },
  { id: '2', title: "شعبه 3" },
  { id: '3', title: "شعبه 4" },
  { id: '4', title: "شعبه 5" },
];
const lines = [
  { id: '0', title: "لاین 1" },
  { id: '1', title: "لاین 2" },
  { id: '2', title: "لاین 3" },
  { id: '3', title: "لاین 4" },
  { id: '4', title: "لاین 5" },
];
const services = [
  { id: '0', title: "خدمت 1" },
  { id: '1', title: "خدمت 2" },
  { id: '2', title: "خدمت 3" },
  { id: '3', title: "خدمت 4" },
  { id: '4', title: "خدمت 5" },
];
const experts = [
  { id: '0', title: "کارشناس 1" },
  { id: '1', title: "کارشناس 2" },
  { id: '2', title: "کارشناس 3" },
  { id: '3', title: "کارشناس 4" },
  { id: '4', title: "کارشناس 5" },
];

const QuickTurn = () => {
  const [selectedBranch, setSelectedBranch] = useState<{
    id: string;
    title: string;
  }>();
  const [selectedLine, setSelectedLine] = useState<{
    id: string;
    title: string;
  }>();
  const [selectedService, setSelectedService] = useState<{
    id: string;
    title: string;
  }>();
  const [selectedExpert, setSelectedExpert] = useState<{
    id: string;
    title: string;
  }>();
  const [isShowMonth, setIsShowMonth] = useState(months[0]?.title);
  const [selectedDay, setSelectedDay] = useState({
    id: "1",
    day: "شنبه",
    dayNumber: "01",
  });
  const [selectedHour, setSelectedHour] = useState({ id: "", title: "" });
  return (
    <section className="relative flex flex-col w-[calc(100%-26.875rem)] min-h-[51.688rem] p-6 bg-white mt-6 rounded-lg border border-gray-card-border">
      <p className="text-base font-semibold text-black mb-6">نوبت سریع</p>
      <div className="grid grid-cols-3 place-items-end gap-x-4 gap-y-6 mb-6">
        <Input label="نام مشتری" wrapperClassName="!w-full" />
        <Input
          wrapperClassName="!w-full"
          inputProps={{
            inputMode: "numeric",
          }}
          label="شماره موبایل"
        />
        <SelectBox
          list={branches}
          placeHolder="انتخاب شعبه"
          selectedItem={selectedBranch}
          onSelect={(item: { id: string; title: string }) =>
            setSelectedBranch({
              id: item?.id,
              title: item?.title,
            })
          }
        />
        <SelectBox
          list={lines}
          placeHolder="انتخاب لاین"
          selectedItem={selectedLine}
          onSelect={(item: { id: string; title: string }) =>
            setSelectedLine({
              id: item?.id,
              title: item?.title,
            })
          }
        />
        <SelectBox
          list={services}
          placeHolder="انتخاب خدمت"
          selectedItem={selectedService}
          onSelect={(item: { id: string; title: string }) =>
            setSelectedService({
              id: item?.id,
              title: item?.title,
            })
          }
        />
        <SelectBox
          list={experts}
          placeHolder="انتخاب کارشناس"
          selectedItem={selectedExpert}
          onSelect={(item: { id: string; title: string }) =>
            setSelectedExpert({
              id: item?.id,
              title: item?.title,
            })
          }
        />
      </div>
      <section className="flex flex-row gap-4 w-full max-w-[58.125rem] mx-auto h-[32.375rem]">
        <div className="flex flex-col w-[14.375rem] h-full max-h-full bg-white border border-card-border pt-[1.125rem] pb-3 rounded-2xl">
          <p className="text-base leading-[1.625rem] font-bold text-black ps-4">
            انتخاب تقویم
          </p>
          <div className="relative w-full mt-[1.625rem] mb-[1.25rem]">
            <Swiper
              className="w-full"
              slidesPerView={1}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              onActiveIndexChange={(e: any) =>
                setIsShowMonth(months[e?.activeIndex]?.title)
              }
              modules={[Navigation, EffectFade]}
              navigation={{
                nextEl: ".calendar-navigation-next",
                prevEl: ".calendar-navigation-prev",
                disabledClass: "disabled-swiper-navigation",
              }}
            >
              {months.map((month) => (
                <SwiperSlide key={month?.id} className="text-center">
                  {month?.title}
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="calendar-navigation-next absolute left-2.5 top-2/4 -translate-y-2/4 z-10 cursor-pointer">
              <svg
                width="18"
                height="18"
                className="fill-black stroke-transparent"
              >
                <use href={"images/icons/panel.svg#arrow-left"}></use>
              </svg>
            </div>
            <div className="calendar-navigation-prev absolute right-2.5 top-2/4 -translate-y-2/4 z-10 cursor-pointer rotate-180">
              <svg
                width="18"
                height="18"
                className="fill-black stroke-transparent"
              >
                <use href={"images/icons/panel.svg#arrow-left"}></use>
              </svg>
            </div>
          </div>
          <ul
            dir="ltr"
            className="flex flex-col px-[0.375rem] mx-1 h-[25rem] overflow-y-auto"
          >
            {days?.map((day) => (
              <li
                dir="rtl"
                onClick={() =>
                  setSelectedDay({
                    id: day?.id,
                    day: day?.title,
                    dayNumber: day?.dayNumber,
                  })
                }
                className={`group flex justify-between last-of-type:!mb-0 px-3 py-[0.625rem] rounded-lg transition-all duration-300 ${
                  day?.id === selectedDay?.id &&
                  !day?.isClosed &&
                  "bg-main-primary shadow-md"
                } ${
                  !day?.isClosed &&
                  "hover:bg-main-primary hover:shadow-md cursor-pointer"
                }`}
              >
                <div key={day?.id} className="flex flex-col items-start gap-1">
                  <span
                    className={`text-[0.688rem] leading-[0.875rem] font-normal text-[rgba(0,0,0,0.4)] transition-[text] duration-300 ${
                      !day?.isClosed &&
                      "group-hover:text-[rgba(255,255,255,0.5)]"
                    } ${
                      day?.id === selectedDay?.id &&
                      "text-[rgba(255,255,255,0.5)]"
                    }`}
                  >
                    {isShowMonth}
                  </span>
                  <span
                    className={`${day?.id === selectedDay?.id && "text-white"}
                    ${
                      day?.isClosed ? "opacity-15" : "group-hover:text-white"
                    } text-sm leading-[1.375rem] font-semibold text-black transition-[color] duration-300`}
                  >
                    {day?.title}
                  </span>
                </div>
                <span
                  className={`transition-[color] duration-300 ${
                    day?.id === selectedDay?.id && "text-white"
                  } ${day?.isClosed ? "opacity-15" : "group-hover:text-white"}`}
                >
                  {day?.dayNumber}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full h-full max-h-full pt-5 pb-10 bg-white border border-card-border rounded-2xl">
          <p className="inline text-black text-sm font-medium mx-[1.125rem]">
            انتخاب ساعت برای تاریخ <span>{selectedDay?.day}</span>
            <span className="mx-px">{selectedDay?.dayNumber}</span>
            <span>{isShowMonth}</span>
          </p>

          <div
            dir="ltr"
            className="flex flex-col mx-1 px-[1.125rem] gap-y-[2.25rem] mt-[1.125rem] bg-white h-full max-h-[calc(100%-2.438rem)] overflow-y-auto"
          >
            {hours
              ?.find((item) => item?.id === selectedDay?.id)
              ?.items?.map((item) => (
                <div dir="rtl" key={item?.id} className="last-of-type:pb-0">
                  <p className="text-black text-sm font-semibold mb-2">
                    {item?.title}
                  </p>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(82px,1fr))] gap-x-3 gap-y-3 text-center">
                    {item?.hours?.map((hour) => (
                      <div
                        tabIndex={0}
                        key={hour?.id}
                        onClick={() =>
                          setSelectedHour({
                            id: hour?.id,
                            title: hour?.title,
                          })
                        }
                        className={`flex items-center justify-center text-sm leading-[1.625rem] font-medium text-black h-[2.375rem] py-[0.375rem] px-4 cursor-pointer transition-all duration-[600ms] border border-gray-card-border ${
                          hour?.id === selectedHour?.id &&
                          "border-main-primary shadow-md"
                        } hover:border-main-primary hover:shadow-md rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm`}
                      >
                        {hour?.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Button className="ms-auto mt-6">ثبت نوبت سریع</Button>
    </section>
  );
};

export default QuickTurn;
