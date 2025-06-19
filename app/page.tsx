'use client'  // obligatoire pour avoir un composant client React

import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les tâches
  async function fetchTasks() {
    try {
      const res = await fetch ('/api/tasks');
      if (!res.ok) throw new Error("Erreur lors de la récupération");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError('Impossible de charger les tâches')
    }
  }

  // Chargement initial des tâches
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fonction pour ajouter une tâche
  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title.trim()) {
      setError("Le titre est requis");
      setLoading(false);
      return;
    }
  try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      setTitle('');
      setDescription('');
      await fetchTasks();  // rafraîchir la liste
    } catch {
      setError("Erreur lors de la création de la tâche");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Taskify - Gestionnaire de tâches</h1>

      <form onSubmit={handleAddTask} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          style={{ padding: 8, width: 300, marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Description (optionnel)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          style={{ padding: 8, width: 400, marginRight: 8 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {tasks.length === 0 && <li>Aucune tâche pour le moment.</li>}
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: 10 }}>
            <strong>{task.title}</strong>  
            {task.description && ` — ${task.description}`}
            <br />
            <small>Créée le : {new Date(task.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
