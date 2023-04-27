using UnityEngine;

public class TreeData
{
    // These 'public' variables make up our tree data schema
    public string treeFamilyName;
    public int treeSize;
    public int treeColour;

    public string Stringify() 
    {
        return JsonUtility.ToJson(this);
    }

    public static PlayerData Parse(string json)
    {
        return JsonUtility.FromJson<PlayerData>(json);
    }
}