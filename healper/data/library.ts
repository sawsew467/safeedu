import { LibraryDataType } from "@/healper/type/library-type";
import news_image1 from "@/assets/images/news_image/News_image1.png";
import news_image2 from "@/assets/images/news_image/News_image2.png";
import news_image3 from "@/assets/images/news_image/News_image3.png";
import card_image_1 from "@/assets/images/library_images/card_image_1.png";
import card_image_2 from "@/assets/images/library_images/card_image_2.png";
import card_image_3 from "@/assets/images/library_images/card_image_3.png";
import card_image_4 from "@/assets/images/library_images/card_image_4.png";
import matuy_tunhien_1 from "@/assets/images/library_images/matuy_image/matuy_tunhien_1.jpg";
import matuy_tunhien_2 from "@/assets/images/library_images/matuy_image/matuy_tunhien_2.jpg";
import matuy_tunhien_3 from "@/assets/images/library_images/matuy_image/matuy_tunhien_3.jpg";
import matuy_bantonghop from "@/assets/images/library_images/matuy_image/matuy_bantonghop.jpg";
import matuy_gigido from "@/assets/images/library_images/matuy_image/matuy_gigido.jpg";
import hethankinhanhhuongmatuy from "@/assets/images/library_images/matuy_image/hethankinhanhhuongmatuy.jpg";
import matuyanhhuongdentimmach from "@/assets/images/library_images/matuy_image/matuyanhhuongdentimmach.jpg";
import roiloantamthandomatuy from "@/assets/images/library_images/matuy_image/roiloantamthandomatuy.png";
import suygiamnhanthucdomatuy from "@/assets/images/library_images/matuy_image/suygiamnhanthucdomatuy.jpeg";

export const LIBRARY_DATA: LibraryDataType[] = [
  {
    id: "title1",
    title: "Tổng Quan Về Ma Túy",
    image: card_image_1,
    subtitle: [
      {
        id: "subTitle1",
        title: "Định nghĩa",
        content: [
          "Theo khoản 1 Điều 2 Luật Phòng chống ma túy 2021 quy định chất ma túy là chất gây nghiện, chất hướng thần được quy định trong danh mục chất ma túy do Chính phủ ban hành.",
          "Theo đó, chất gây nghiện là chất kích thích hoặc ức chế thần kinh, dễ gây tình trạng nghiện đối với người sử dụng.",
          "Chất hướng thần là chất kích thích hoặc ức chế thần kinh hoặc gây ảo giác, nếu sử dụng nhiều lần có thể dẫn tới tình trạng nghiện đối với người sử dụng.",
        ],
        image: [""],
        imageDescription: [""],
      },
      {
        id: "subTitle2",
        title: "Phân loại",
        content: [
          "1. Theo nguồn gốc ",
          "Dựa vào nguồn gốc của ma tuý, có thể phân chia thành 3 loại: \n- Ma túy tự nhiên: Đây là các chất ma tuý có sẵn trong tự nhiên, là alcaloid của một số thực vật như cây thuốc phiện (anh túc), cây cần sa (cây gai dầu), cây coca (cocain). \n- Ma túy bán tổng hợp: Heroin, Moóc phin \n- Ma túy tổng hợp: Amphetamin, MDMA, ecstasy, ma túy đá...",
          "2. Phân loại theo tác động lên thần kinh trung ương",
          "- Nhóm gây ức chế hệ thần kinh trung ương: thuốc phiện, nguồn gốc thuốc phiện (morphin, heroin, cocain...), các thuốc an thần gây ngủ (seduxen, phenobarbital) \n- Nhóm gây kích thích thần kinh trung ương: Nhóm này gồm amphetamin và các dẫn xuất. Khi sử dụng gây tăng hoạt động, tăng sinh lực, tăng nhịp tim, tăng hô hấp... \n- Nhóm gây ảo giác: Nhóm này gây thay đổi về nhận thức và môi trường xung quanh, nghe thấy những âm thanh không có thực. Bao gồm các loại như thuốc lắc, cần sa...",
          "3. Phân loại theo mức độ gây nghiện",
          "Phân loại theo mức độ gây nghiện \n- Ma tuý hiệu lực cao: Sử dụng liều nhỏ đã gây ra các thay đổi tâm sinh lý con người và có thể gây nghiện sau vài lần sử dụng. Gồm: Thuốc phiện, heroin, cocaine, amphetamin, ecstasy… \n- Ma tuý hiệu lực thấp: Là các chất phải dùng liều thật cao mới có thể tác động đến tâm sinh lý người sử dụng. Ví dụ: thuốc lá, thuốc lào...",
        ],
        image: [matuy_tunhien_2, matuy_bantonghop],
        imageDescription: ["Ma túy tự nhiên", "Ma tuý bán tổng hợp"],
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
          "Sử dụng ma túy gây tổn thương nghiêm trọng đến các cơ quan chính như hệ thần kinh, tim mạch và phổi. Các chất ma túy có thể làm suy giảm chức năng não bộ, gây rối loạn trí nhớ và khả năng tập trung.",
          "Người nghiện ma túy thường có nguy cơ mắc các bệnh về tim mạch như nhồi máu cơ tim và đột quỵ. Đối với hệ hô hấp, việc hít hoặc hút các chất ma túy có thể làm tổn thương phổi và làm tăng nguy cơ ung thư phổi.",
          "Ngoài ra, sử dụng ma túy còn làm tăng khả năng mắc các bệnh lây truyền qua đường máu như HIV/AIDS do hành vi dùng chung kim tiêm.",
        ],
        image: [hethankinhanhhuongmatuy, matuyanhhuongdentimmach],
        imageDescription: [
          "Hệ thần kinh bị tổn thương do ma túy",
          "Sự ảnh hưởng của ma túy đến hệ tim mạch",
        ],
      },
      {
        id: "subTitle2",
        title: "Tác hại về mặt tâm lý",
        content: [
          "Ma túy có thể gây ra các rối loạn tâm thần nghiêm trọng, bao gồm loạn thần, ảo giác và mất kiểm soát hành vi. Sử dụng ma túy trong thời gian dài có thể dẫn đến sự suy giảm tinh thần và các vấn đề về hành vi.",
          "Người nghiện ma túy có xu hướng phát triển các triệu chứng lo âu, hoảng loạn và trầm cảm. Các chất ma túy cũng ảnh hưởng đến khả năng kiểm soát cảm xúc, dẫn đến hành vi bạo lực và tự gây thương tích.",
          "Việc mất kiểm soát hành vi và suy giảm khả năng nhận thức có thể khiến người nghiện dễ dấn thân vào các hoạt động bất hợp pháp và làm tổn hại đến các mối quan hệ xã hội.",
        ],
        image: [roiloantamthandomatuy, suygiamnhanthucdomatuy],
        imageDescription: [
          "Rối loạn tâm thần do tác động của ma túy",
          "Sự suy giảm nhận thức và hành vi của người nghiện",
        ],
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
          "Quá trình cai nghiện là hành trình gian nan giúp người nghiện phục hồi và từ bỏ ma túy. Quá trình này thường bao gồm các giai đoạn như cắt giảm liều, điều trị bằng thuốc và tham vấn tâm lý nhằm hỗ trợ người nghiện về mặt tinh thần.",
          "Trong giai đoạn cai nghiện, người nghiện có thể gặp các triệu chứng khó chịu như run rẩy, đổ mồ hôi, lo lắng và đau nhức cơ thể. Để giảm thiểu các triệu chứng này, y tế và gia đình cần phối hợp để tạo điều kiện tốt nhất cho người nghiện.",
          "Ngoài ra, việc hỗ trợ tâm lý và giúp người nghiện xây dựng lại các mối quan hệ xã hội là yếu tố quan trọng để ngăn ngừa tái nghiện.",
        ],
        image: [],
        imageDescription: [],
      },
      {
        id: "subTitle2",
        title: "Vai trò của gia đình và cộng đồng",
        content: [
          "Gia đình đóng vai trò rất quan trọng trong việc hỗ trợ người nghiện phục hồi. Sự ủng hộ từ gia đình có thể giúp người nghiện có thêm động lực để từ bỏ ma túy và đối mặt với các khó khăn trong quá trình cai nghiện.",
          "Cộng đồng cũng có thể góp phần vào quá trình phục hồi của người nghiện thông qua các chương trình giáo dục và hỗ trợ tái hòa nhập. Các tổ chức cộng đồng và hội đoàn có thể cung cấp các hoạt động xã hội, giúp người nghiện làm quen với một cuộc sống lành mạnh.",
          "Các dịch vụ tư vấn và giáo dục cộng đồng là cần thiết để nâng cao nhận thức, giảm kỳ thị và tạo môi trường thân thiện cho người nghiện tái hòa nhập.",
        ],
        image: [],
        imageDescription: [],
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
          "Hotline hỗ trợ khẩn cấp hoạt động 24/7 nhằm cung cấp hỗ trợ nhanh chóng cho người gặp vấn đề về ma túy. Người nghiện hoặc người thân có thể gọi để được tư vấn và hỗ trợ giải quyết các tình huống khẩn cấp liên quan đến ma túy.",
          "Ngoài việc cung cấp thông tin về các trung tâm cai nghiện và các phương pháp điều trị, hotline còn hỗ trợ về mặt tâm lý cho người nghiện và gia đình họ, giúp họ có thể đưa ra quyết định đúng đắn trong quá trình cai nghiện.",
          "Hotline cũng là nơi người dân có thể báo cáo các hoạt động liên quan đến buôn bán và sử dụng trái phép ma túy trong cộng đồng, góp phần giúp cơ quan chức năng có thể can thiệp kịp thời.",
        ],
        image: [],
        imageDescription: [],
      },
      {
        id: "subTitle2",
        title: "Tư vấn pháp lý",
        content: [
          "Ngoài việc tư vấn về cai nghiện, hotline còn cung cấp các thông tin pháp lý cho người dân về quyền và trách nhiệm của họ liên quan đến ma túy. Điều này bao gồm các quyền lợi pháp lý khi tham gia vào các chương trình cai nghiện tự nguyện và những điều cần biết về luật pháp liên quan đến ma túy.",
          "Hotline cũng giúp người dân hiểu rõ các hình phạt liên quan đến hành vi tàng trữ, buôn bán và sử dụng ma túy, từ đó nâng cao ý thức tuân thủ pháp luật.",
          "Đội ngũ tư vấn pháp lý trên hotline luôn sẵn sàng hỗ trợ các thắc mắc liên quan đến pháp luật và bảo vệ quyền lợi hợp pháp của người dân khi tham gia các hoạt động phòng chống ma túy.",
        ],
        image: [],
        imageDescription: [],
      },
    ],
  },
];
