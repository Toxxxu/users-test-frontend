import { useEffect, useState } from "react";
import { testsService } from "../../../../services/tests/tests.service";
import { Test } from "../../../../models/Test.model";

const useTests = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tests, setTests] = useState<Test[]>([]);
  const [assignedTests, setAssignedTests] = useState<Test[]>([]);
  const [completedTests, setCompletedTests] = useState<Test[]>([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsData = await testsService.findAllTests();
        setLoading(false);
        setTests(testsData);
      } catch (error) {
        console.error('Failed to fetch tests:', error);
      }
    };

    const fetchAssignedTests = async () => {
      try {
        const token: string = localStorage.getItem('token') || '';
        const assignedTestsData = await testsService.findAssignedTests(token);
        setLoading(false);
        setAssignedTests(assignedTestsData);
      } catch (error) {
        console.error('Failed to fetch assigned tests:', error);
      }
    }

    const fetchCompletedTests = async () => {
      try {
        const token: string = localStorage.getItem('token') || '';
        const completedTestsData = await testsService.findCompletedTests(token);
        setLoading(false);
        setCompletedTests(completedTestsData);
      } catch (error) {
        console.error('Failed to fetch completed tests:', error);
      }
    }

    fetchTests();
    fetchAssignedTests();
    fetchCompletedTests();
  }, []);

  return { tests, assignedTests, completedTests, loading };
}

export { useTests };