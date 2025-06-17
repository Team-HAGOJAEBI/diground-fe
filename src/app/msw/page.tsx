"use client";

import { useState, useEffect } from "react";
import type { User, NewUser } from "./type";

export default function ExamplePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", gender: "" });

  // 사용자 목록 조회
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getuserlist", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`);
        }
        const result = await response.json();
        if (result.status === 200 && result.data) {
          setUsers(result.data);
        } else {
          throw new Error("사용자 목록 조회 실패");
        }
      } catch (error) {
        alert("사용자 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchUsers();
  }, []);

  // 새 사용자 추가
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name,
          gender: newUser.gender,
        }),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 201 && result.data) {
        setUsers((prev) => [...prev, result.data]);
        setNewUser({ name: "", gender: "" });
      } else {
        throw new Error("사용자 추가 실패");
      }
    } catch (error) {
      alert("사용자 추가 중 오류가 발생했습니다.");
    }
  };

  const getUserList = async () => {
    try {
      const response = await fetch("/api/getuserlist", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setUsers(result.data);
      } else {
        throw new Error("사용자 목록 조회 실패");
      }
    } catch (error) {
      alert("사용자 목록 조회 중 오류 발생:" + error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">MSW 테스트 페이지</h1>

      <button onClick={getUserList}>유저 목록 조회</button>

      <h4 className="text-2xl font-bold mb-4">유저 추가 테스트</h4>
      {/* 사용자 추가 폼 */}
      <form
        onSubmit={handleSubmit}
        className="mb-4"
      >
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="이름"
          className="border p-2 mr-2"
        />
        <select
          value={newUser.gender}
          onChange={(e) => setNewUser((prev) => ({ ...prev, gender: e.target.value }))}
          className="border p-2 mr-2"
        >
          <option value="">성별 선택</option>
          <option value="m">남성</option>
          <option value="f">여성</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          추가
        </button>
      </form>

      {/* 사용자 목록 */}
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="border-b py-2"
          >
            {user.name} ({user.gender === "m" ? "남성" : "여성"})
          </li>
        ))}
      </ul>
    </div>
  );
}
