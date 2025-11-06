import React, { useState } from 'react';
import FormInput from '../ui/FormInput';
import FormTextarea from '../ui/FormTextarea';
import FormSelect from '../ui/FormSelect';

export default function RecruitTeamModal({ isOpen, onClose, onAddTeam }) {
  const [form, setForm] = useState({
    title: '',
    category: '',
    period: '',
    deadline: '',
    description: '',
    neededRoles: '',
    techStack: '',
    tags: '',
    links: '',
    location: '',
    selectionProcess: '',
    contact: '',
  });

  const onForm = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const splitCsv = (s) =>
    s
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeam = {
      id: Date.now(), // Use timestamp for unique ID for now
      title: form.title,
      category: form.category,
      leader: {
        name: '현재 사용자',
        avatar: 'https://via.placeholder.com/40/A8C5E6/FFFFFF?text=U',
        role: '팀 리더',
      },
      status: '모집중',
      period: form.period,
      deadline: form.deadline,
      description: form.description,
      fullDescription: form.description,
      neededRoles: form.neededRoles,
      participants: [
        {
          name: '현재 사용자',
          role: '팀 리더',
          avatar: 'https://via.placeholder.com/40/A8C5E6/FFFFFF?text=U',
        },
      ],
      techStack: splitCsv(form.techStack),
      tags: splitCsv(form.tags),
      images: [
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
      ],
      links: splitCsv(form.links),
      location: form.location,
      selectionProcess: form.selectionProcess,
      contact: form.contact,
      goals: ['프로젝트 완성', '팀워크 향상', '실무 경험'],
      benefits: ['실무 경험', '포트폴리오', '네트워킹'],
    };

    onAddTeam(newTeam);
    // Reset form
    setForm({
        title: '',
        category: '',
        period: '',
        deadline: '',
        description: '',
        neededRoles: '',
        techStack: '',
        tags: '',
        links: '',
        location: '',
        selectionProcess: '',
        contact: '',
      });
    onClose();
    alert('팀 모집이 성공적으로 등록되었습니다!');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-3xl bg-gray-900 rounded-2xl border border-gray-800 p-6"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="orbitron text-2xl font-bold gradient-text">
            팀 모집 시작하기
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
            aria-label="모달 닫기"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="프로젝트 제목 *"
              name="title"
              value={form.title}
              onChange={onForm}
              required
              placeholder="프로젝트 제목을 입력하세요"
            />
            <FormSelect
              label="카테고리 *"
              name="category"
              value={form.category}
              onChange={onForm}
              required
              options={['해커톤', '공모전', '프로젝트', '스터디']}
            />
            <FormInput
              label="진행 기간 *"
              name="period"
              value={form.period}
              onChange={onForm}
              required
              placeholder="2025.07.14 – 2025.07.18"
            />
            <FormInput
              label="지원 마감일 *"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={onForm}
              required
            />
            <FormTextarea
              label="프로젝트 설명 *"
              name="description"
              value={form.description}
              onChange={onForm}
              required
              placeholder="무엇을 만들고 왜 하는지 적어주세요"
            />
            <FormInput
              label="모집 중인 역할 *"
              name="neededRoles"
              value={form.neededRoles}
              onChange={onForm}
              required
              placeholder="예) 기획, 프론트엔드"
            />
            <FormInput
              label="기술 스택"
              name="techStack"
              value={form.techStack}
              onChange={onForm}
              placeholder="예) React, Tailwind (쉼표로 구분)"
            />
            <FormInput
              label="태그"
              name="tags"
              value={form.tags}
              onChange={onForm}
              placeholder="예) AI, 해커톤 (쉼표로 구분)"
            />
            <FormInput
              label="관련 링크"
              name="links"
              value={form.links}
              onChange={onForm}
              placeholder="https://github.com/project (쉼표로 구분)"
            />
            <FormInput
              label="진행 방식"
              name="location"
              value={form.location}
              onChange={onForm}
              placeholder="온라인 / 오프라인(서울) 등"
            />
            <FormInput
              label="선발 과정"
              name="selectionProcess"
              value={form.selectionProcess}
              onChange={onForm}
              placeholder="서류 → 과제 → 인터뷰"
            />
            <FormInput
              label="연락처 *"
              name="contact"
              value={form.contact}
              onChange={onForm}
              required
              placeholder="이메일 또는 오픈채팅 링크"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="cta-button px-6 py-2 rounded-lg font-medium text-white"
            >
              모집 시작하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
