import { LibraryDataType } from "@/healper/type/library-type";
import news_image1 from "@/assets/images/news_image/News_image1.png";
import news_image2 from "@/assets/images/news_image/News_image2.png";
import news_image3 from "@/assets/images/news_image/News_image3.png";
import card_image_1 from "@/assets/images/library_images/card_image_1.png";
import card_image_2 from "@/assets/images/library_images/card_image_2.png";
import card_image_3 from "@/assets/images/library_images/card_image_3.png";
import card_image_4 from "@/assets/images/library_images/card_image_4.png";

export const LIBRARY_DATA: LibraryDataType[] = [
  {
    id: "title1",
    title: "Tổng Quan Về Ma Túy",
    image: card_image_1,
    subtitle: [
      {
        id: "subTitle1",
        title: "Định nghĩa và phân loại",
        content: [
          "Ma túy là các chất gây nghiện có thể ảnh hưởng đến tâm lý và hành vi của người dùng.",
          "Chúng được chia thành nhiều loại, bao gồm ma túy tự nhiên và ma túy tổng hợp.",
        ],
        image: [news_image1, news_image2],
        imageDescription: ["Ma túy tự nhiên", "Ma túy tổng hợp"],
      },
      {
        id: "subTitle2",
        title: "Tác động xã hội",
        content: [
          "Ma túy gây ra các vấn đề xã hội nghiêm trọng, ảnh hưởng đến cộng đồng và hệ thống y tế.",
          "Tăng cường nhận thức là cách tốt nhất để phòng ngừa tác hại của ma túy.",
        ],
        image: [news_image1, news_image3],
        imageDescription: ["Tác động xã hội của ma túy"],
      },
    ],
  },
  {
    id: "title2",
    title: "Tác Hại Của Ma Tuý",
    image: card_image_2,
    subtitle: [
      {
        id: "subTitle1",
        title: "Ảnh hưởng đến sức khỏe",
        content: [
          "Ma túy có thể gây tổn thương nghiêm trọng đến hệ thần kinh và tim mạch.",
          "Người sử dụng ma túy có nguy cơ mắc các bệnh tâm lý cao hơn.",
        ],
        image: [news_image2, news_image1],
        imageDescription: ["Ảnh hưởng đến hệ thần kinh"],
      },
      {
        id: "subTitle2",
        title: "Tác hại về mặt tâm lý",
        content: [
          "Ma túy có thể gây loạn thần, mất trí nhớ và hoang tưởng.",
          "Nghiện ma túy khiến người dùng không thể kiểm soát hành vi.",
        ],
        image: [news_image2, news_image3],
        imageDescription: ["Loạn thần do ma túy", "Tác hại tâm lý"],
      },
    ],
  },
  {
    id: "title3",
    title: "Cai Nghiện Và Hỗ Trợ",
    image: card_image_3,
    subtitle: [
      {
        id: "subTitle1",
        title: "Quá trình cai nghiện",
        content: [
          "Cai nghiện là quá trình giúp người nghiện phục hồi và từ bỏ ma túy.",
          "Điều trị tâm lý và hỗ trợ y tế là cần thiết trong quá trình cai nghiện.",
        ],
        image: [news_image3],
        imageDescription: ["Quá trình cai nghiện"],
      },
      {
        id: "subTitle2",
        title: "Vai trò của gia đình và cộng đồng",
        content: [
          "Gia đình đóng vai trò quan trọng trong việc hỗ trợ người nghiện.",
          "Cộng đồng có thể giúp đỡ thông qua các chương trình giáo dục và tái hòa nhập.",
        ],
        image: [news_image3, card_image_3],
        imageDescription: [
          "Gia đình hỗ trợ cai nghiện",
          "Cộng đồng giúp đỡ người nghiện",
        ],
      },
    ],
  },
  {
    id: "title4",
    title: "Hotline Hỗ Trợ Khẩn Cấp",
    image: card_image_4,
    subtitle: [
      {
        id: "subTitle1",
        title: "Hotline tư vấn",
        content: [
          "Hotline cung cấp hỗ trợ 24/7 cho người gặp vấn đề về ma túy.",
          "Người dân có thể gọi để nhận thông tin về cai nghiện và xử lý khẩn cấp.",
        ],
        image: [card_image_4],
        imageDescription: ["Hotline hỗ trợ khẩn cấp"],
      },
      {
        id: "subTitle2",
        title: "Tư vấn pháp lý",
        content: [
          "Hotline cũng cung cấp tư vấn pháp lý cho các vấn đề liên quan đến ma túy.",
          "Giúp người dân hiểu rõ quyền lợi và trách nhiệm pháp lý của mình.",
        ],
        image: [card_image_4, news_image1],
        imageDescription: ["Tư vấn pháp lý", "Quyền lợi pháp lý của người dân"],
      },
    ],
  },
];
