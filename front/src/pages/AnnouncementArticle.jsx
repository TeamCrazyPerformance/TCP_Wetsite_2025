import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';



// 더미 게시글 데이터 (실제로는 API에서 가져옴)
const allArticlesData = [
  {
    id: 0,
    category: '모집공고',
    title: '2025학년도 2학기 TCP 신입 부원 모집 안내',
    author: '관리자',
    date: '2025-07-01',
    views: 245,
    likes: 18,
    tags: ['모집', '신입', '2025'],
    content: `
            <p class="text-lg font-medium text-blue-300 mb-6">
                안녕하세요, TCP(Team Crazy Performance) 회원 여러분!
            </p>
            <p>
                우리는 2025학년도 2학기 TCP 신입 부원 모집을 공식적으로 발표하게 되어 기쁩니다. 
                고급 소프트웨어 개발에 전념하는 동아리로서, 웹, 앱, 또는 임베디드 개발에 열정적인 
                모든 학생들을 환영합니다.
            </p>
            <h3 class="orbitron text-xl font-bold text-blue-400 mt-8 mb-4">📅 오리엔테이션 일정</h3>
            <p>
                오리엔테이션 세션은 <strong class="text-blue-300">7월 15일 오후 6시</strong>, 
                <strong class="text-purple-300">공학관 302호</strong>에서 개최될 예정입니다.
            </p>
            <h3 class="orbitron text-xl font-bold text-blue-400 mt-8 mb-4">🎯 지원 자격</h3>
            <p>
                TCP는 다음과 같은 학생들을 찾고 있습니다:
            </p>
            <ul class="list-disc list-inside ml-4 space-y-2 text-gray-300">
                <li>소프트웨어 개발에 대한 강한 열정을 가진 학생</li>
                <li>팀워크와 협업을 중시하는 학생</li>
                <li>새로운 기술 학습에 적극적인 학생</li>
                <li>프로젝트 경험이 있거나 관련 분야에 관심이 있는 학생</li>
            </ul>
            <h3 class="orbitron text-xl font-bold text-blue-400 mt-8 mb-4">🚀 TCP에서 얻을 수 있는 것</h3>
            <p>
                TCP 회원으로서 다음과 같은 혜택을 누릴 수 있습니다:
            </p>
            <ul class="list-disc list-inside ml-4 space-y-2 text-gray-300">
                <li>실무 중심의 프로젝트 경험</li>
                <li>선배들의 멘토링 및 기술 지도</li>
                <li>다양한 개발 스택 학습 기회</li>
                <li>네트워킹 및 취업 지원</li>
                <li>해커톤 및 대회 참가 기회</li>
            </ul>
            <h3 class="orbitron text-xl font-bold text-blue-400 mt-8 mb-4">📝 지원 방법</h3>
            <p>
                지원을 원하시는 분들은 첨부된 링크의 구글 폼을 작성해 주시기 바랍니다. 
                간단한 자기소개와 개발 경험, 그리고 TCP에 대한 관심사를 적어주시면 됩니다.
            </p>
            <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 my-8">
                <div class="flex items-center space-x-3 mb-4">
                    <i class="fas fa-link text-white text-2xl"></i>
                    <h4 class="orbitron text-lg font-bold text-white">지원서 링크</h4>
                </div>
                <p class="text-white mb-4">
                    아래 링크를 클릭하여 지원서를 작성해 주세요:
                </p>
                <a href="#" class="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    <i class="fab fa-google mr-2"></i>
                    지원서 바로가기
                </a>
            </div>
            <h3 class="orbitron text-xl font-bold text-blue-400 mt-8 mb-4">❓ 궁금한 점이 있다면</h3>
            <p>
                기타 궁금한 사항이 있으시면 언제든지 연락 주시기 바랍니다. 
                아래 연락처로 문의하시거나, 오리엔테이션에 참석하여 직접 질문해 주세요.
            </p>
            <div class="bg-gray-800 rounded-lg p-6 mt-8">
                <h4 class="orbitron text-lg font-bold text-blue-300 mb-4">연락처 정보</h4>
                <div class="space-y-3 text-gray-300">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-envelope text-purple-400"></i>
                        <span>tcp@university.ac.kr</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-phone text-green-400"></i>
                        <span>010-1234-5678</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <i class="fab fa-instagram text-pink-400"></i>
                        <span>@tcp_official</span>
                    </div>
                </div>
            </div>
            <p class="text-center text-lg font-medium text-gradient-to-r from-blue-400 to-purple-400 mt-8">
                TCP와 함께 성장하며 뛰어난 개발자가 되어보세요! 🚀
            </p>
        `,
  },
  {
    id: 1,
    category: '공지사항',
    title: '정기 스터디 개설 및 참여 독려',
    author: '관리자',
    date: '2025-06-25',
    views: 180,
    likes: 10,
    tags: ['스터디', '참여', '공지'],
    content:
      '<p>하반기 정기 스터디를 개설합니다. 적극적인 참여와 새로운 스터디 제안을 부탁드립니다.</p>',
  },
  {
    id: 2,
    category: '행사안내',
    title: '제1회 TCP 해커톤 개최 공고',
    author: '관리자',
    date: '2025-06-18',
    views: 350,
    likes: 25,
    tags: ['해커톤', '행사', '공고'],
    content: '<p>TCP 첫 해커톤이 개최됩니다. 많은 관심과 참여 바랍니다.</p>',
  },
  {
    id: 3,
    category: '규정안내',
    title: '동아리실 이용 수칙 안내',
    author: '관리자',
    date: '2025-06-10',
    views: 90,
    likes: 5,
    tags: ['규정', '동아리실'],
    content:
      '<p>동아리실 이용에 대한 새로운 수칙이 적용되니 확인하시고 협조 부탁드립니다.</p>',
  },
];

function AnnouncementArticle() {
  const { id } = useParams(); // 라우트 파라미터 이름을 'id'로 받습니다.
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // 디버깅을 위한 로그 추가
  console.log('useParams에서 가져온 id:', id, typeof id);

  // URL 파라미터의 id(문자열)와 일치하는 게시글을 찾습니다.
  const article = allArticlesData.find((art) => art.id === parseInt(id));

  // 디버깅을 위한 로그 추가
  console.log('찾은 게시글 데이터:', article);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-fade').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const copyUrl = () => {
    const urlToCopy = window.location.href;
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
        alert('URL 복사에 실패했습니다.');
      });
  };

  const handleShareButtonClick = (platform) => {
    const url = window.location.href;
    const title = document.title;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(
          shareUrl,
          '_blank',
          'noopener,noreferrer,width=600,height=600'
        );
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(
          shareUrl,
          '_blank',
          'noopener,noreferrer,width=600,height=400'
        );
        break;
      case 'kakao':
        alert(
          '카카오톡 공유는 카카오 SDK 연동이 필요합니다. 원하시면 연동해드릴게요.'
        );
        break;
      case 'instagram':
        alert(
          'Instagram은 웹 링크 공유 인터페이스가 제한적입니다. Web Share API 또는 앱 내 공유를 사용하세요.'
        );
        break;
      default:
        break;
    }
  };

  // 게시글이 없을 경우 에러 메시지 렌더링
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-gray-400">
        <h1 className="text-4xl">게시글을 찾을 수 없습니다.</h1>
        <Link
          to="/announcement"
          className="mt-8 back-button inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium"
        >
          <i className="fas fa-list mr-3"></i>
          공지사항 목록 보기
        </Link>
      </div>
    );
  }

  const articleBodyMarkup = { __html: article.content };

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 scroll-fade">
          <Link
            to="/announcement"
            className="back-button inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            공지사항 목록으로 돌아가기
          </Link>
        </div>
        <article className="scroll-fade">
          <header className="mb-8">
            <div className="mb-4">
              <span className="tag px-3 py-1 rounded-full text-xs">
                {article.category}
              </span>
            </div>
            <h1 className="orbitron text-3xl md:text-5xl font-bold mb-6 gradient-text">
              {article.title}
            </h1>
            <div className="article-meta rounded-lg p-6 mb-8">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-300">
                <div className="flex items-center space-x-6 mb-2 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-user text-blue-400"></i>
                    <span>작성자: {article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-calendar text-purple-400"></i>
                    <span>
                      {new Date(article.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-eye text-green-400"></i>
                    <span>조회 {article.views}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-heart text-pink-400"></i>
                    <span>좋아요 {article.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="article-content rounded-lg p-8 mb-8">
            <div
              className="article-body text-gray-200"
              dangerouslySetInnerHTML={articleBodyMarkup}
            />
          </div>
          <footer className="border-t border-gray-700 pt-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <i className="fas fa-heart text-pink-400"></i>
                  <span>좋아요</span>
                  <span className="text-pink-400">{article.likes}</span>
                </button>
                <button
                  onClick={openShareModal}
                  id="shareBtn"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <i className="fas fa-share text-blue-400"></i>
                  <span>공유</span>
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>태그:</span>
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </footer>
        </article>
        <div className="text-center mt-12">
          <Link
            to="/announcement"
            className="back-button inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium"
          >
            <i className="fas fa-list mr-3"></i>
            공지사항 목록 보기
          </Link>
        </div>
      </div>
      {isShareModalOpen && (
        <div
          id="shareModal"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shareModalTitle"
          onClick={closeShareModal}
        >
          <div
            className="bg-gray-900 text-white rounded-xl overflow-hidden w-80 shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-gray-800">
              <h2 id="shareModalTitle" className="text-lg font-semibold">
                공유하기
              </h2>
            </div>
            <div className="p-4 space-y-2">
              <button
                onClick={copyUrl}
                className="w-full inline-flex items-center justify-start space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
              >
                <i className="fas fa-link text-gray-300"></i>
                <span>URL 복사</span>
              </button>
              <button
                onClick={() => handleShareButtonClick('kakao')}
                className="w-full inline-flex items-center justify-start space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
              >
                <i className="fas fa-comment" style={{ color: '#FEE500' }}></i>
                <span>카카오톡</span>
              </button>
              <button
                onClick={() => handleShareButtonClick('instagram')}
                className="w-full inline-flex items-center justify-start space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
              >
                <i className="fab fa-instagram text-pink-400"></i>
                <span>Instagram</span>
              </button>
              <button
                onClick={() => handleShareButtonClick('facebook')}
                className="w-full inline-flex items-center justify-start space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
              >
                <i className="fab fa-facebook text-blue-600"></i>
                <span>Facebook</span>
              </button>
              <button
                onClick={() => handleShareButtonClick('twitter')}
                className="w-full inline-flex items-center justify-start space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
              >
                <i className="fab fa-twitter text-blue-400"></i>
                <span>Twitter</span>
              </button>
            </div>
            <div className="px-4 py-3 border-t border-gray-800 text-right">
              <button
                onClick={closeShareModal}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AnnouncementArticle;
