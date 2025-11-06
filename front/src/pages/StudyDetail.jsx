import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allStudies } from '../data/studies'; // 분리된 데이터 임포트

// 임시 멤버 데이터
const dummyMembers = [
  { id: 1, name: '김민준', role: '스터디장', avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: '이서연', role: '스터디원', avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: '박도윤', role: '스터디원', avatar: 'https://via.placeholder.com/40' },
  { id: 4, name: '최지우', role: '스터디원', avatar: 'https://via.placeholder.com/40' },
];

export default function StudyDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [members, setMembers] = useState(dummyMembers);

  // TODO: 실제 사용자 인증 정보를 바탕으로 역할을 결정해야 함
  const [userRole, setUserRole] = useState('guest'); // 'guest', 'member', 'leader'

  useEffect(() => {
    const foundStudy = allStudies.find((s) => s.id === id);
    if (foundStudy) {
      setStudy(foundStudy);
    } else {
      // 스터디를 찾지 못한 경우의 처리 (예: 404 페이지로 리디렉션)
      console.error('Study not found!');
    }
  }, [id]);

  if (!study) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        스터디 정보를 불러오는 중...
      </div>
    );
  }

  const handleJoin = () => alert('스터디 가입 신청이 완료되었습니다.');
  const handleLeave = () => alert('스터디를 탈퇴했습니다.');
  const handleDelete = () => {
    if (window.confirm('정말로 이 스터디를 삭제하시겠습니까?')) {
      alert('스터디가 삭제되었습니다.');
      // TODO: navigate to /study
    }
  };

  const ActionButtons = () => {
    switch (userRole) {
      case 'leader':
        return (
          <div className="flex items-center gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              <i className="fas fa-cog mr-2"></i>스터디 관리
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              <i className="fas fa-pen mr-2"></i>글 수정
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              <i className="fas fa-trash mr-2"></i>글 삭제
            </button>
          </div>
        );
      case 'member':
        return (
          <button
            onClick={handleLeave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            스터디 탈퇴하기
          </button>
        );
      case 'guest':
      default:
        return (
          <button
            onClick={handleJoin}
            className="cta-button text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            가입 신청하기
          </button>
        );
    }
  };

  return (
    <main className="container mx-auto px-4 py-24">
      {/* 역할 변경 테스트용 버튼 */}
      <div className="fixed top-24 right-4 bg-gray-800 p-2 rounded-lg shadow-lg z-50 text-sm">
        <p className="text-white mb-2">[테스트용 역할 전환]</p>
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="bg-gray-700 text-white rounded p-1"
        >
          <option value="guest">Guest</option>
          <option value="member">Member</option>
          <option value="leader">Leader</option>
        </select>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-accent-blue font-semibold">TCP {study.year} 스터디</p>
          <h1 className="orbitron text-4xl md:text-5xl font-bold gradient-text my-3">
            {study.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {study.tags.map((tag) => (
              <span key={tag} className="tag-blue text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Study Info & Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-300">
            <p>
              <strong className="text-white">기간:</strong> {study.period}
            </p>
            <p>
              <strong className="text-white">방식:</strong> {study.method}
            </p>
            <p>
              <strong className="text-white">인원:</strong> {study.members}
            </p>
            <p>
              <strong className="text-white">장소:</strong> {study.location}
            </p>
          </div>
          <div className="w-full md:w-auto flex-shrink-0">
            <ActionButtons />
          </div>
        </div>

        {/* Main Content */}
        <article className="prose prose-invert max-w-none bg-gray-900 border border-gray-800 rounded-xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">스터디 소개</h2>
          <p>{study.description}</p>
          {/* 여기에 마크다운 렌더링이 필요하다면 추가 */}
        </article>

        {/* Member List */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">참여중인 스터디원</h2>
          <ul className="space-y-4">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-bold text-white">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
                {userRole === 'leader' && member.role !== '스터디장' && (
                  <button className="text-sm text-red-500 hover:text-red-400">
                    내보내기
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
