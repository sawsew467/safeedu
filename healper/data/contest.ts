
import img_contest_detail_1 from "@/assets/images/contest/contest-detail_1.png"
import img_contest_detail_2 from "@/assets/images/contest/contest-detail_2.png"
import img_contest_detail_3 from "@/assets/images/contest/contest-detail_3.png"
import img_contest_detail_4 from "@/assets/images/contest/contest-detail_4.png"
import image_detail_contest_1 from "@/assets/images/contest/details/phongchongmatuy_1.png"
import image_detail_contest_2 from "@/assets/images/contest/details/phongchongmatuy_2.png"
import image_detail_contest_3 from "@/assets/images/contest/details/phongchongmatuy_3.png"
import image_detail_contest_4 from "@/assets/images/contest/details/phongchongmatuy_4.png"
import image_detail_contest_5 from "@/assets/images/contest/details/phongchongmatuy_5.png"
import image_detail_contest_6 from "@/assets/images/contest/details/phongchongmatuy_6.png"
import { DataType } from "@/components/features/Contest"
import { TypeDetailDrawData, TypeLeaderBoard } from "../type/Contest"

export const DATA: DataType[] = [
    {
        id: "1",
        title: "Cuộc thi đang diễn ra ",
        content: [
            {
                id: "content1",
                image: img_contest_detail_1,
                address: "Đà Nẵng",
                desc: "Cuộc thi về phòng chống ma tuý Đà Nẵng",
                joiner: 200,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content2",
                image: img_contest_detail_2,
                address: "Hồ Chí Minh",
                desc: "Cuộc Thi Sáng Tạo Chống Ma Túy",
                joiner: 140,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content3",
                image: img_contest_detail_3,
                address: "Hà Nội",
                desc: "Cuộc thi về phòng chống ma tuý Đà Nẵng",
                joiner: 220,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content4",
                image: img_contest_detail_4,
                address: "Quảng Ninh",
                desc: "Cuộc Thi Sáng Tạo Chống Ma Túy",
                joiner: 300,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
        ]
    },
    {
        id: "2",
        title: "Cuộc thi đang tham gia ",
        content: [
            {
                id: "content5",
                image: img_contest_detail_1,
                address: "Đà Nẵng",
                desc: "Cuộc thi về phòng chống ma tuý Đà Nẵng",
                joiner: 200,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content6",
                image: img_contest_detail_4,
                address: "Hồ Chí Minh",
                desc: "Cuộc Thi Sáng Tạo Chống Ma Túy",
                joiner: 140,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content7",
                image: img_contest_detail_3,
                address: "Hà Nội",
                desc: "Cuộc thi về phòng chống ma tuý Đà Nẵng",
                joiner: 220,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content8",
                image: img_contest_detail_2,
                address: "Quảng Ninh",
                desc: "Cuộc Thi Sáng Tạo Chống Ma Túy",
                joiner: 300,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
        ]
    },
    {
        id: "3",
        title: "Cuộc thi sắp diễn ra ",
        content: [
            {
                id: "content9",
                image: img_contest_detail_4,
                address: "Đà Nẵng",
                desc: "Cuộc thi về phòng chống ma tuý Đà Nẵng",
                joiner: 200,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content10",
                image: img_contest_detail_2,
                address: "Hồ Chí Minh",
                desc: "Cuộc Thi Sáng Tạo Chống Ma Túy",
                joiner: 140,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content11",
                image: img_contest_detail_3,
                address: "Hà Nội",
                desc: "Cuộc thi về phòng chống ma tuý Đà Nẵng",
                joiner: 220,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
            {
                id: "content12",
                image: img_contest_detail_1,
                address: "Quảng Ninh",
                desc: "Cuộc Thi Sáng Tạo Chống Ma Túy",
                joiner: 300,
                parts: [{ title: "Phần thi lý thuyết", slug: "phan-thi-ly-thuyet" }, { title: "Phần thi thực hành", slug: "phan-thi-thuc-hanh" }, { title: "Nghĩ luận xã hội", slug: "nghi-luan-xa-hoi" }, { title: "Vẽ tranh cổ động", slug: "ve-tranh-co-dong" }],
            },
        ]
    },
]

export const DRAW_DATA = [{
    slug: "ve-tranh-co-dong",
    content: [
        { image: image_detail_contest_1, slug: "anh-1" },
        { image: image_detail_contest_2, slug: "anh-2" },
        { image: image_detail_contest_3, slug: "anh-3" },
        { image: image_detail_contest_4, slug: "anh-4" },
        { image: image_detail_contest_5, slug: "anh-5" },
        { image: image_detail_contest_6, slug: "anh-6" },

    ]
}]

export const DETAIL_DRAW_DATA: TypeDetailDrawData[] = [
    {
        id: "anh-1",
        title: "Cái chết về ma túy",
        image: image_detail_contest_1,
        author: "Thái Triển",
        dobAuthor: "12/07/2002",
        type: "Tranh vẽ tay",
        desc: "“Cái chết của ma túy” là một bức tranh mạnh mẽ và đầy cảm xúc, mô tả sự tàn phá của ma túy đối với con người và xã hội. Bối cảnh trung tâm là một hình tượng con người, gầy gò và mệt mỏi, chìm trong bóng tối, với đôi mắt trống rỗng và khuôn mặt mòn mỏi. Những dây xích vô hình của nghiện ngập đang siết chặt quanh cơ thể, như thể họ đang bị giam cầm trong một vòng xoáy không lối thoát. Xung quanh là những mảnh vụn của cuộc đời họ — những mảnh ký ức, niềm vui, hạnh phúc đã bị ma túy phá hủy, rơi rớt như tàn tro."
    },
    {
        id: "anh-2",
        title: "Đẩy lùi HIV/AIDS",
        image: image_detail_contest_2,
        author: "Thái Triển",
        dobAuthor: "12/07/2002",
        type: "Tranh vẽ máy",
        desc: "“Cái chết của ma túy” là một bức tranh mạnh mẽ và đầy cảm xúc, mô tả sự tàn phá của ma túy đối với con người và xã hội. Bối cảnh trung tâm là một hình tượng con người, gầy gò và mệt mỏi, chìm trong bóng tối, với đôi mắt trống rỗng và khuôn mặt mòn mỏi. Những dây xích vô hình của nghiện ngập đang siết chặt quanh cơ thể, như thể họ đang bị giam cầm trong một vòng xoáy không lối thoát. Xung quanh là những mảnh vụn của cuộc đời họ — những mảnh ký ức, niềm vui, hạnh phúc đã bị ma túy phá hủy, rơi rớt như tàn tro."
    },
    {
        id: "anh-3",
        title: "Bài trừ ma túy",
        image: image_detail_contest_3,
        author: "Thái Triển",
        dobAuthor: "12/07/2002",
        type: "Tranh vẽ máy",
        desc: "“Cái chết của ma túy” là một bức tranh mạnh mẽ và đầy cảm xúc, mô tả sự tàn phá của ma túy đối với con người và xã hội. Bối cảnh trung tâm là một hình tượng con người, gầy gò và mệt mỏi, chìm trong bóng tối, với đôi mắt trống rỗng và khuôn mặt mòn mỏi. Những dây xích vô hình của nghiện ngập đang siết chặt quanh cơ thể, như thể họ đang bị giam cầm trong một vòng xoáy không lối thoát. Xung quanh là những mảnh vụn của cuộc đời họ — những mảnh ký ức, niềm vui, hạnh phúc đã bị ma túy phá hủy, rơi rớt như tàn tro."
    },
    {
        id: "anh-4",
        title: "Nói không với ma túy",
        image: image_detail_contest_4,
        author: "Thái Triển",
        dobAuthor: "12/07/2002",
        type: "Tranh vẽ tay",
        desc: "“Cái chết của ma túy” là một bức tranh mạnh mẽ và đầy cảm xúc, mô tả sự tàn phá của ma túy đối với con người và xã hội. Bối cảnh trung tâm là một hình tượng con người, gầy gò và mệt mỏi, chìm trong bóng tối, với đôi mắt trống rỗng và khuôn mặt mòn mỏi. Những dây xích vô hình của nghiện ngập đang siết chặt quanh cơ thể, như thể họ đang bị giam cầm trong một vòng xoáy không lối thoát. Xung quanh là những mảnh vụn của cuộc đời họ — những mảnh ký ức, niềm vui, hạnh phúc đã bị ma túy phá hủy, rơi rớt như tàn tro."
    },
    {
        id: "anh-5",
        title: "Sự ăn mòm ma túy",
        image: image_detail_contest_5,
        author: "Thái Triển",
        dobAuthor: "12/07/2002",
        type: "Tranh vẽ tay",
        desc: "“Cái chết của ma túy” là một bức tranh mạnh mẽ và đầy cảm xúc, mô tả sự tàn phá của ma túy đối với con người và xã hội. Bối cảnh trung tâm là một hình tượng con người, gầy gò và mệt mỏi, chìm trong bóng tối, với đôi mắt trống rỗng và khuôn mặt mòn mỏi. Những dây xích vô hình của nghiện ngập đang siết chặt quanh cơ thể, như thể họ đang bị giam cầm trong một vòng xoáy không lối thoát. Xung quanh là những mảnh vụn của cuộc đời họ — những mảnh ký ức, niềm vui, hạnh phúc đã bị ma túy phá hủy, rơi rớt như tàn tro."
    },
    {
        id: "anh-6",
        title: "Ma túy HIV/AIDS",
        image: image_detail_contest_6,
        author: "Lê Đức Anh Phương",
        dobAuthor: "20/09/2004",
        type: "Tranh vẽ tay",
        desc: "“Cái chết của ma túy” là một bức tranh mạnh mẽ và đầy cảm xúc, mô tả sự tàn phá của ma túy đối với con người và xã hội. Bối cảnh trung tâm là một hình tượng con người, gầy gò và mệt mỏi, chìm trong bóng tối, với đôi mắt trống rỗng và khuôn mặt mòn mỏi. Những dây xích vô hình của nghiện ngập đang siết chặt quanh cơ thể, như thể họ đang bị giam cầm trong một vòng xoáy không lối thoát. Xung quanh là những mảnh vụn của cuộc đời họ — những mảnh ký ức, niềm vui, hạnh phúc đã bị ma túy phá hủy, rơi rớt như tàn tro."
    },
]

export const LEADERBOARD_DATA: TypeLeaderBoard[] = [
    {
        name: "A.phương",
        avatar: img_contest_detail_1,
        point: "99"
    },
    {
        name: "B.Thắng",
        avatar: img_contest_detail_2,
        point: "80"
    },
    {
        name: "D.Khang",
        avatar: img_contest_detail_3,
        point: "78"
    },
    {
        name: "T.Thủy",
        avatar: img_contest_detail_1,
        point: "76"
    },
    {
        name: "T.Sương",
        avatar: img_contest_detail_2,
        point: "74"
    },
    {
        name: "Q.Như",
        avatar: img_contest_detail_2,
        point: "70"
    },
    {
        name: "V.Thiệu",
        avatar: img_contest_detail_3,
        point: "60"
    },
]