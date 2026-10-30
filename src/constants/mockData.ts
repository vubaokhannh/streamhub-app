import { Movie, Plan, UserProfile, WatchHistoryItem, UserDevice, LoginHistoryItem, MovieComment, MovieCast } from '@/types';

export const SAMPLE_VIDEO_URL =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
export const SAMPLE_VIDEO_TRAILER =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const HERO_MOVIES: Movie[] = [
  {
    id: 'hero-1',
    title: 'Dune: Phần Hai',
    originalTitle: 'Dune: Part Two',
    slug: 'dune-part-two',
    description:
      'Paul Atreides hợp nhất với Chani và người Fremen trong cuộc chiến phục thù những kẻ đã hủy diệt gia tộc của anh. Đứng trước sự lựa chọn nghiệt ngã giữa tình yêu của đời mình và vận mệnh của vũ trụ, Paul tìm mọi cách ngăn chặn tương lai kinh hoàng mà chỉ mình anh có thể thấy trước.',
    backdropUrl:
      'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s520QIq.jpg',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    rating: 4.9,
    year: 2024,
    duration: 166,
    ageRating: 'T16',
    movieType: 'MOVIE',
    genres: ['Khoa học viễn tưởng', 'Hành động', 'Phiêu lưu'],
    director: 'Denis Villeneuve',
    isPremium: true,
    isRecommended: true,
    language: 'Vietsub + Thuyết minh',
    videoUrl: SAMPLE_VIDEO_URL,
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem', 'Austin Butler'],
    castMembers: [
      {
        id: 'c-1',
        name: 'Timothée Chalamet',
        character: 'Paul Atreides',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      },
      {
        id: 'c-2',
        name: 'Zendaya',
        character: 'Chani',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      },
      {
        id: 'c-3',
        name: 'Rebecca Ferguson',
        character: 'Lady Jessica',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      },
      {
        id: 'c-4',
        name: 'Austin Butler',
        character: 'Feyd-Rautha',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    id: 'hero-2',
    title: 'Arcane: Mùa 2',
    originalTitle: 'Arcane: League of Legends Season 2',
    slug: 'arcane-season-2',
    description:
      'Sự cân bằng mong manh giữa thành phố công nghệ Piltover và khu hầm mỏ tăm tối Zaun bùng nổ thành cuộc chiến toàn diện. Vi và Jinx giờ đây đứng ở hai đầu chiến tuyến, mỗi quyết định đều phải trả giá bằng xương máu.',
    backdropUrl:
      'https://image.tmdb.org/t/p/w1280/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    rating: 4.9,
    year: 2024,
    duration: 45,
    ageRating: 'T16',
    movieType: 'SERIES',
    genres: ['Hoạt hình', 'Hành động', 'Khoa học viễn tưởng'],
    director: 'Christian Linke',
    isPremium: true,
    isRecommended: true,
    totalEpisodes: 9,
    language: 'Lồng tiếng + Vietsub',
    videoUrl: SAMPLE_VIDEO_URL,
    cast: ['Hailee Steinfeld', 'Ella Purnell', 'Katie Leung', 'Reed Shannon'],
    castMembers: [
      {
        id: 'c-5',
        name: 'Hailee Steinfeld',
        character: 'Vi (Voice)',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      },
      {
        id: 'c-6',
        name: 'Ella Purnell',
        character: 'Jinx (Voice)',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
      },
      {
        id: 'c-7',
        name: 'Katie Leung',
        character: 'Caitlyn (Voice)',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      },
    ],
    seasons: [
      {
        id: 'sea-1',
        seasonNumber: 2,
        title: 'Mùa 2: Hồi Kết',
        episodes: [
          {
            id: 'ep-201',
            episodeNumber: 1,
            title: 'Tập 1: Nặng trĩu vương miện',
            duration: 42,
            videoUrl: SAMPLE_VIDEO_URL,
            thumbnailUrl: 'https://image.tmdb.org/t/p/w780/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
          },
          {
            id: 'ep-202',
            episodeNumber: 2,
            title: 'Tập 2: Nhìn tất cả sụp đổ',
            duration: 45,
            videoUrl: SAMPLE_VIDEO_TRAILER,
            thumbnailUrl: 'https://image.tmdb.org/t/p/w780/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
          },
          {
            id: 'ep-203',
            episodeNumber: 3,
            title: 'Tập 3: Lời thú tội',
            duration: 44,
            videoUrl: SAMPLE_VIDEO_URL,
            thumbnailUrl: 'https://image.tmdb.org/t/p/w780/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
          },
          {
            id: 'ep-204',
            episodeNumber: 4,
            title: 'Tập 4: Bức tranh Zaun',
            duration: 41,
            videoUrl: SAMPLE_VIDEO_URL,
            thumbnailUrl: 'https://image.tmdb.org/t/p/w780/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
          },
        ],
      },
      {
        id: 'sea-0',
        seasonNumber: 1,
        title: 'Mùa 1: Nguồn Cội',
        episodes: [
          {
            id: 'ep-101',
            episodeNumber: 1,
            title: 'Tập 1: Chào mừng tới Piltover',
            duration: 43,
            videoUrl: SAMPLE_VIDEO_URL,
            thumbnailUrl: 'https://image.tmdb.org/t/p/w780/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
          },
          {
            id: 'ep-102',
            episodeNumber: 2,
            title: 'Tập 2: Một số bí mật tốt nhất nên để chôn giấu',
            duration: 40,
            videoUrl: SAMPLE_VIDEO_TRAILER,
            thumbnailUrl: 'https://image.tmdb.org/t/p/w780/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'hero-3',
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    slug: 'oppenheimer',
    description:
      'Câu chuyện về nhà vật lý lý thuyết J. Robert Oppenheimer, người dẫn đầu dự án Manhattan phát triển vũ khí hạt nhân đầu tiên của nhân loại và những dằn vặt đạo đức khốc liệt sau vụ thử nghiệm Trinity.',
    backdropUrl:
      'https://image.tmdb.org/t/p/w1280/rM5Y09xC9YneFOT9crUR5IXTIOT.jpg',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    rating: 4.8,
    year: 2023,
    duration: 180,
    ageRating: 'T18',
    movieType: 'MOVIE',
    genres: ['Tiểu sử', 'Lịch sử', 'Chính kịch'],
    director: 'Christopher Nolan',
    isPremium: false,
    isRecommended: true,
    language: 'Vietsub',
    videoUrl: SAMPLE_VIDEO_URL,
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    castMembers: [
      {
        id: 'c-8',
        name: 'Cillian Murphy',
        character: 'J. Robert Oppenheimer',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      },
      {
        id: 'c-9',
        name: 'Robert Downey Jr.',
        character: 'Lewis Strauss',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      },
    ],
  },
];

export const RECOMMENDED_MOVIES: Movie[] = [
  {
    id: 'rec-1',
    title: 'Deadpool & Wolverine',
    originalTitle: 'Deadpool & Wolverine',
    slug: 'deadpool-and-wolverine',
    description: 'Wade Wilson và Wolverine hợp sức trong nhiệm vụ sinh tử bảo vệ dòng thời gian.',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/yDHYTfA3R0jFYba16jBB1jv8uaC.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    rating: 4.7,
    year: 2024,
    duration: 128,
    ageRating: 'T18',
    movieType: 'MOVIE',
    genres: ['Hành động', 'Hài hước'],
    isPremium: true,
    language: 'Thuyết minh',
  },
  {
    id: 'rec-2',
    title: 'Interstellar: Hố Đen Tử Thần',
    originalTitle: 'Interstellar',
    slug: 'interstellar',
    description: 'Một nhóm thám hiểm vũ trụ vượt qua lỗ sâu để tìm kiếm ngôi nhà mới cho nhân loại.',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    rating: 5.0,
    year: 2014,
    duration: 169,
    ageRating: 'T13',
    movieType: 'MOVIE',
    genres: ['Khoa học viễn tưởng', 'Phiêu lưu'],
    isPremium: false,
    language: 'Vietsub',
  },
  {
    id: 'rec-3',
    title: 'Spider-Man: Du Hành Vũ Trụ',
    originalTitle: 'Spider-Man: Across the Spider-Verse',
    slug: 'spider-man-across-the-spider-verse',
    description: 'Miles Morales du hành qua đa vũ trụ và đối đầu với một đội ngũ Người Nhện khác.',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    rating: 4.9,
    year: 2023,
    duration: 140,
    ageRating: 'K',
    movieType: 'CARTOON',
    genres: ['Hoạt hình', 'Hành động', 'Viễn tưởng'],
    isPremium: true,
    language: 'Lồng tiếng',
  },
  {
    id: 'rec-4',
    title: 'Avatar: Dòng Chảy Của Nước',
    originalTitle: 'Avatar: The Way of Water',
    slug: 'avatar-the-way-of-water',
    description: 'Jake Sully và Neytiri nỗ lực giữ gia đình bên nhau và khám phá đại dương Pandora.',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    rating: 4.8,
    year: 2022,
    duration: 192,
    ageRating: 'T13',
    movieType: 'MOVIE',
    genres: ['Hành động', 'Khoa học viễn tưởng'],
    isPremium: false,
    language: 'Vietsub',
  },
];

export const SERIES_MOVIES: Movie[] = [
  {
    id: 'series-1',
    title: 'Stranger Things: Mùa 4',
    originalTitle: 'Stranger Things Season 4',
    slug: 'stranger-things-4',
    description: 'Bóng tối tại Hawkins trỗi dậy với con quái vật Vecna tàn độc từ Thế Giới Ngược.',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    rating: 4.8,
    year: 2022,
    duration: 65,
    ageRating: 'T16',
    movieType: 'SERIES',
    genres: ['Kinh dị', 'Viễn tưởng', 'Kỳ ảo'],
    totalEpisodes: 9,
    isPremium: true,
    language: 'Vietsub',
  },
  {
    id: 'series-2',
    title: 'Thế Kỷ Shogun',
    originalTitle: 'Shōgun',
    slug: 'shogun',
    description: 'Cuộc tranh đoạt quyền lực đẫm máu thời phong kiến Nhật Bản thế kỷ 17.',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
    rating: 4.9,
    year: 2024,
    duration: 60,
    ageRating: 'T18',
    movieType: 'SERIES',
    genres: ['Lịch sử', 'Chính kịch', 'Chiến tranh'],
    totalEpisodes: 10,
    isPremium: true,
    language: 'Vietsub',
  },
  {
    id: 'series-3',
    title: 'Trò Chơi Vương Quyền',
    originalTitle: 'Game of Thrones',
    slug: 'game-of-thrones',
    description: 'Chín gia tộc quý tộc chiến đấu khốc liệt để giành quyền kiểm soát Ngai Sắt xứ Westeros.',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    rating: 4.9,
    year: 2019,
    duration: 55,
    ageRating: 'T18',
    movieType: 'SERIES',
    genres: ['Hành động', 'Kỳ ảo', 'Chính kịch'],
    totalEpisodes: 73,
    isPremium: true,
    language: 'Vietsub',
  },
];

export const STREAMHUB_FEATURES = [
  {
    id: 'feat-1',
    icon: 'Monitor',
    title: 'Chất Lượng 4K Ultra HD',
    description: 'Trải nghiệm điện ảnh đỉnh cao với dải tương phản động cao HDR10+ và độ sắc nét chân thực.',
  },
  {
    id: 'feat-2',
    icon: 'Download',
    title: 'Tải Xuống Ngoại Tuyến',
    description: 'Giải trí mọi lúc, mọi nơi. Tải trước trọn bộ phim về điện thoại để xem khi không có mạng.',
  },
  {
    id: 'feat-3',
    icon: 'Smartphone',
    title: 'Đồng Bộ Mọi Thiết Bị',
    description: 'Thưởng thức trên Smart TV, máy tính bảng, điện thoại. Tự động tiếp tục xem đúng đoạn bạn dừng.',
  },
  {
    id: 'feat-4',
    icon: 'Volume2',
    title: 'Âm Thanh Dolby Atmos',
    description: 'Không gian âm thanh vòm sống động như tại rạp chiếu phim hiện đại.',
  },
  {
    id: 'feat-5',
    icon: 'ShieldCheck',
    title: 'Bảo Vệ Gia Đình & Trẻ Em',
    description: 'Chế độ an toàn cho trẻ nhỏ với danh mục hoạt hình chọn lọc và mã PIN kiểm soát.',
  },
  {
    id: 'feat-6',
    icon: 'Zap',
    title: 'Phát Luồng Siêu Tốc',
    description: 'Công nghệ HLS tốc độ cao, không giật lag, tự động tương thích theo tốc độ mạng.',
  },
];

export const VIP_PLANS: Plan[] = [
  {
    id: 'plan-basic',
    name: 'Gói Cơ Bản',
    price: 59000,
    durationDays: 30,
    maxDevices: 1,
    resolution: 'Full HD (1080p)',
    features: [
      'Xem không giới hạn kho phim',
      '1 thiết bị xem cùng lúc',
      'Độ phân giải Full HD',
      'Không quảng cáo làm phiền',
    ],
    isPopular: false,
  },
  {
    id: 'plan-standard',
    name: 'Gói Tiêu Chuẩn',
    price: 99000,
    durationDays: 30,
    maxDevices: 2,
    resolution: '2K QHD',
    features: [
      '2 thiết bị phát đồng thời',
      'Độ phân giải siêu nét 2K',
      'Tải xuống xem ngoại tuyến',
      'Âm thanh Dolby Digital 5.1',
    ],
    isPopular: true,
  },
  {
    id: 'plan-premium',
    name: 'Gói VIP Premium',
    price: 149000,
    durationDays: 30,
    maxDevices: 4,
    resolution: '4K Ultra HD + HDR',
    features: [
      '4 thiết bị phát đồng thời',
      'Chất lượng 4K Ultra HD & HDR10+',
      'Âm thanh vòm Dolby Atmos',
      'Ưu tiên xem phim chiếu rạp sớm nhất',
    ],
    isVip: true,
  },
];

export const FAQ_LIST = [
  {
    question: 'StreamHub là gì?',
    answer:
      'StreamHub là nền tảng xem phim và truyền hình trực tuyến bản quyền chất lượng cao, cung cấp hàng ngàn bộ phim điện ảnh, phim bộ độc quyền, anime và sự kiện trực tiếp với chất lượng 4K HDR và âm thanh Dolby Atmos.',
  },
  {
    question: 'Tôi có thể xem StreamHub trên các thiết bị nào?',
    answer:
      'Bạn có thể xem mượt mà trên ứng dụng di động iOS/Android, Smart TV (Samsung, LG, Android TV), Apple TV, máy tính bảng và mọi trình duyệt web hiện đại.',
  },
  {
    question: 'Làm thế nào để hủy gói cước?',
    answer:
      'StreamHub hoàn toàn linh hoạt. Không có hợp đồng ràng buộc hay phí hủy. Bạn có thể dễ dàng hủy gia hạn bất kỳ lúc nào trực tiếp trong phần Cài đặt tài khoản.',
  },
  {
    question: 'StreamHub có an toàn cho trẻ em không?',
    answer:
      'Có. Chúng tôi cung cấp chế độ StreamHub Kids riêng biệt với nội dung thân thiện được kiểm duyệt kỹ càng cùng tính năng khóa phụ huynh bằng mã PIN an toàn.',
  },
];

export const MOCK_USER: UserProfile = {
  id: 'usr-001',
  name: 'Vũ Bảo Khánh',
  email: 'baokhanh.streamhub@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  phone: '0988 123 456',
  createdAt: '2024-01-15T08:00:00.000Z',
  isVip: true,
  vipPlanName: 'Gói VIP Premium (4K Ultra HD)',
  vipExpiresAt: '2026-12-31',
};

export const MOCK_WATCH_HISTORY: WatchHistoryItem[] = [
  {
    id: 'wh-1',
    movie: HERO_MOVIES[0], // Dune 2
    progressPercent: 72,
    lastWatchedAt: 'Hôm nay',
  },
  {
    id: 'wh-2',
    movie: HERO_MOVIES[1], // Arcane Season 2
    progressPercent: 45,
    lastWatchedAt: 'Hôm qua',
    currentEpisode: 4,
  },
  {
    id: 'wh-3',
    movie: RECOMMENDED_MOVIES[0], // Deadpool & Wolverine
    progressPercent: 90,
    lastWatchedAt: '3 ngày trước',
  },
  {
    id: 'wh-4',
    movie: SERIES_MOVIES[0], // Stranger Things 4
    progressPercent: 28,
    lastWatchedAt: 'Tuần trước',
    currentEpisode: 2,
  },
];

export const MOCK_DEVICES: UserDevice[] = [
  {
    id: 'dev-1',
    deviceName: 'iPhone 16 Pro Max',
    deviceType: 'phone',
    lastActive: 'Đang hoạt động',
    isCurrentDevice: true,
    location: 'TP. Hồ Chí Minh, Việt Nam',
    ipAddress: '113.161.45.102',
    browserOrApp: 'Ứng dụng StreamHub iOS v2.4.0',
    loginDate: 'Hôm nay, 10:15',
  },
  {
    id: 'dev-2',
    deviceName: 'iPad Pro M4 13-inch',
    deviceType: 'tablet',
    lastActive: '2 giờ trước',
    isCurrentDevice: false,
    location: 'TP. Hồ Chí Minh, Việt Nam',
    ipAddress: '113.161.45.102',
    browserOrApp: 'Ứng dụng StreamHub iPadOS v2.4.0',
    loginDate: '28/10/2026, 19:40',
  },
  {
    id: 'dev-3',
    deviceName: 'Samsung QLED 4K 65"',
    deviceType: 'tv',
    lastActive: 'Hôm qua',
    isCurrentDevice: false,
    location: 'TP. Hồ Chí Minh, Việt Nam',
    ipAddress: '14.169.88.21',
    browserOrApp: 'StreamHub Smart TV v1.8.2',
    loginDate: '27/10/2026, 20:30',
  },
  {
    id: 'dev-4',
    deviceName: 'MacBook Pro M3 Max',
    deviceType: 'web',
    lastActive: '3 ngày trước',
    isCurrentDevice: false,
    location: 'Hà Nội, Việt Nam',
    ipAddress: '118.70.192.44',
    browserOrApp: 'Safari 18.2 trên macOS Sequoia',
    loginDate: '25/10/2026, 14:12',
  },
];

export const MOCK_LOGIN_HISTORY: LoginHistoryItem[] = [
  {
    id: 'lh-1',
    deviceName: 'iPhone 16 Pro Max',
    deviceType: 'phone',
    timestamp: 'Hôm nay, 10:15',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    ipAddress: '113.161.45.102',
    browserOrApp: 'StreamHub iOS App',
    status: 'ACTIVE',
  },
  {
    id: 'lh-2',
    deviceName: 'iPad Pro M4 13-inch',
    deviceType: 'tablet',
    timestamp: '28/10/2026, 19:40',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    ipAddress: '113.161.45.102',
    browserOrApp: 'StreamHub iPadOS App',
    status: 'SUCCESS',
  },
  {
    id: 'lh-3',
    deviceName: 'Samsung QLED 4K 65"',
    deviceType: 'tv',
    timestamp: '27/10/2026, 20:30',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    ipAddress: '14.169.88.21',
    browserOrApp: 'StreamHub Tizen TV',
    status: 'SUCCESS',
  },
  {
    id: 'lh-4',
    deviceName: 'MacBook Pro M3 Max',
    deviceType: 'web',
    timestamp: '25/10/2026, 14:12',
    location: 'Hà Nội, Việt Nam',
    ipAddress: '118.70.192.44',
    browserOrApp: 'Safari trên macOS',
    status: 'SUCCESS',
  },
  {
    id: 'lh-5',
    deviceName: 'Chrome trên Windows 11',
    deviceType: 'web',
    timestamp: '18/10/2026, 09:25',
    location: 'Đà Nẵng, Việt Nam',
    ipAddress: '42.115.77.19',
    browserOrApp: 'Google Chrome v130',
    status: 'SUCCESS',
  },
];

export const ALL_MOVIES: Movie[] = [
  ...HERO_MOVIES,
  ...RECOMMENDED_MOVIES,
  ...SERIES_MOVIES,
];

export const getMovieById = (idOrSlug?: string): Movie => {
  if (!idOrSlug) return HERO_MOVIES[0];
  const found = ALL_MOVIES.find(
    (m) => m.id === idOrSlug || m.slug === idOrSlug
  );
  return found || HERO_MOVIES[0];
};

export const MOCK_MOVIE_COMMENTS: MovieComment[] = [
  {
    id: 'cm-1',
    userName: 'Minh Quân',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Hình ảnh 4K HDR nét căng đét, âm thanh Dolby Atmos nghe tiếng cát rung chuyển cả phòng. Cực phẩm điện ảnh năm nay!',
    createdAt: '2 giờ trước',
    likesCount: 42,
    isLiked: true,
  },
  {
    id: 'cm-2',
    userName: 'Thu Thảo',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Diễn xuất của Timothée Chalamet và Austin Butler quá đỉnh cao. Xem trên StreamHub mượt mà không hề bị delay hay giật lag.',
    createdAt: '5 giờ trước',
    likesCount: 18,
    isLiked: false,
  },
  {
    id: 'cm-3',
    userName: 'Hoàng Long',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    rating: 4,
    content: 'Phim rất cuốn, âm nhạc của Hans Zimmer quá xuất sắc. Đăng ký gói VIP xem không hối hận tí nào.',
    createdAt: 'Hôm qua',
    likesCount: 9,
    isLiked: false,
  },
];

