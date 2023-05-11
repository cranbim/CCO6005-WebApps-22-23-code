
using UnityEngine;

public class TreeRender : MonoBehaviour
{

    private TreeData myTreeData;
    private string dataURL="http://localhost:3000/treedataone"; //one tree
    // private string dataURL="http://localhost:3000/treedata"; //all tree data

    void Start()
    {
        myTreeData = new TreeData();
        StartCoroutine(Download(result => {
            Debug.Log(result);
        }));
    }

    void FetchTreeData(){
        StartCoroutine(Download(myTreeData.Stringify(), result => {
            Debug.Log(result);
        }));
    }

    IEnumerator DownloadOne(System.Action<TreeData> callback = null)
    {

        using (UnityWebRequest request = UnityWebRequest.Get(dataURL))
        {
            yield return request.SendWebRequest();

            if (request.isNetworkError || request.isHttpError)
            {
                Debug.Log(request.error);
                if (callback != null)
                {
                    callback.Invoke(null);
                }
            }
            else
            {
                if (callback != null)
                {
                    callback.Invoke(TreeData.Parse(request.downloadHandler.text));
                }
                else
                {
                    //if no callback just display the data
                    Debug.Log(TreeData.Parse(request.downloadHandler.text));
                }
            }
        }
    }
    
}

