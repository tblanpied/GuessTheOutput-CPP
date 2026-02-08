#include <iostream>

int main()
{
    int data[7]{};

    std::cout << (sizeof(data) / sizeof(data[0])) << '\n';
    return 0;
}
