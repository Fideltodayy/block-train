import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Modal from "@/components/Modal";
import TutorAssignmentForm from "../TutorAssignmentForm";

const ManageLessons = ({ lessons }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedlessonId, setSelectedlessonId] = useState(null);

  const handleAssignTutor = (lessonId) => {
    setSelectedlessonId(lessonId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedlessonId(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage lessons</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Student</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="text-center">
                <td className="text-left py-2 px-4 border-b">{lesson.title}</td>
                <td className="text-left py-2 px-4 border-b">
                  {lesson.description}
                </td>
                <td className="py-2 px-4 border-b">
                  {lesson.student.username}
                </td>
                <td className="py-2 px-4 border-b">
                  {format(new Date(lesson.dueDate), "yyyy-MM-dd")}
                </td>
                <td>
                  <h3 className="text-lg font-semibold mb-2">
                    Uploaded Files:
                  </h3>
                  <ul className="list-disc pl-5">
                    {lesson.documents.map((doc, index) => (
                      <li key={index}>
                        <a
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {doc.split("/").pop()}{" "}
                          {/* Display only the filename */}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border-b">${lesson.price}</td>
                <td className="py-2 px-4 border-b">
                  <Badge>{lesson.status}</Badge>
                </td>
                <td className="py-2 px-4 border-b">
                  <Button
                    className="bg-green-500 text-white"
                    onClick={() => handleAssignTutor(lesson._id)}
                  >
                    Assign Tutor
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={closeModal}>
        <TutorAssignmentForm lessonId={selectedlessonId} />
      </Modal>
    </div>
  );
};

export default ManageLessons;
