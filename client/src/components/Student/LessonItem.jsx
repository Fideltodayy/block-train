import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LessonItem = ({ lesson }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="py-2   font-medium">{lesson.title}</td>
      <td className="py-2 ">{new Date(lesson.dueDate).toLocaleDateString()}</td>
      <td className="py-2 ">
        {lesson?.agreedPrice ? `$${lesson.agreedPrice}` : "pending"}
      </td>
      <td className="py-2 ">
        <Badge
          color="primary"
          className="capitalize"
          style={{
            backgroundColor: lesson.status === "completed" ? "green" : "red",
          }}
        >
          {lesson.status}
        </Badge>
      </td>
      <td className="py-2 ">{lesson.tutor?.username || "N/A"}</td>

      <td className="py-2 ">{lesson.paid ? "Yes" : "No"}</td>
      <td className="py-2  flex gap-2 justify-center">
        <Button
          variant="outline"
          className="text-orange-800 border-orange-800 hover:bg-orange-200"
          onClick={() => navigate(`/lesson/${lesson._id}`)}
        >
          View Details
        </Button>
      </td>
    </tr>
  );
};

export default LessonItem;
