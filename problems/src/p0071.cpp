#include <iostream>

int main()
{
    void inner()
    {
        std::cout << "Inner\n";
    }

    inner();
    return 0;
}
