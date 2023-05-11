using UnityEngine;

public class TreeData
{
    // These 'public' variables make up our tree data schema
    public string treeName;
    public int treeShape;
    public int treeColour;

    public string Stringify() 
    {
        return JsonUtility.ToJson(this);
    }

    public static TreeData Parse(string json)
    {
        return JsonUtility.FromJson<TreeData>(json);
    }
}